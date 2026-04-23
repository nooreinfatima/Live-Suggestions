import { streamCompletion } from "../services/groq.service.js";
import { buildDetailPrompt, buildChatPrompt } from "../services/promptBuilder.service.js";
import { getDetailContext } from "../services/contextManager.service.js";
import logger from "../utils/logger.js";

/**
 * Handle chat requests — both suggestion detail expansion and direct questions.
 * Uses SSE streaming for low first-token latency.
 */
export async function handleChat(req, res, next) {
    try {
        const {
            transcript,
            suggestion,
            question,
            chatHistory,
            customPrompt,
            detailContextWindow,
        } = req.body;

        if (!transcript && !question) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Either transcript with a suggestion or a question is required.",
            });
        }

        const context = getDetailContext(transcript || "", detailContextWindow);

        // Build the appropriate prompt
        let messages;
        if (suggestion) {
            // User clicked on a suggestion card — expand it
            messages = buildDetailPrompt(context, suggestion, chatHistory, customPrompt);
        } else {
            // User typed a direct question
            messages = buildChatPrompt(context, question, chatHistory, customPrompt);
        }

        // Set up SSE headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        res.flushHeaders();

        // Stream the response
        const stream = await streamCompletion(messages, req.apiKey);

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        res.write("data: [DONE]\n\n");
        res.end();

        logger.info("Chat stream completed");
    } catch (err) {
        // If headers already sent, we can't send a JSON error
        if (res.headersSent) {
            res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
            res.end();
        } else {
            next(err);
        }
    }
}
