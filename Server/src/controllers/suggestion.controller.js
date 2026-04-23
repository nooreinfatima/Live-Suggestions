import { generateCompletion } from "../services/groq.service.js";
import { buildSuggestionPrompt } from "../services/promptBuilder.service.js";
import { getSuggestionContext } from "../services/contextManager.service.js";
import logger from "../utils/logger.js";

/**
 * Handle suggestion generation requests.
 * Takes the transcript and produces exactly 3 contextual suggestions.
 */
export async function handleSuggestions(req, res, next) {
    try {
        const { transcript, contextWindow, customPrompt } = req.body;

        if (!transcript || typeof transcript !== "string" || transcript.trim().length === 0) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Transcript text is required.",
            });
        }

        // Trim transcript to context window
        const context = getSuggestionContext(transcript, contextWindow);

        // Build prompt messages
        const messages = buildSuggestionPrompt(context, contextWindow || 3000, customPrompt);

        // Generate suggestions
        const rawResponse = await generateCompletion(messages, req.apiKey);

        // Parse JSON response from the model
        let suggestions;
        try {
            // Extract JSON array from the response (model might wrap it in markdown fences)
            const jsonMatch = rawResponse.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                throw new Error("No JSON array found in response");
            }
            suggestions = JSON.parse(jsonMatch[0]);
        } catch (parseErr) {
            logger.error("Failed to parse suggestion response:", rawResponse);
            return res.status(502).json({
                error: "Parse Error",
                message: "Failed to parse AI suggestions. Try refreshing.",
            });
        }

        // Validate structure
        if (!Array.isArray(suggestions) || suggestions.length === 0) {
            return res.status(502).json({
                error: "Invalid Response",
                message: "AI returned invalid suggestions format.",
            });
        }

        // Normalize to exactly 3 suggestions
        const normalized = suggestions.slice(0, 3).map((s) => ({
            type: s.type || "talking_point",
            title: s.title || "Suggestion",
            preview: s.preview || "",
        }));

        logger.info(`Generated ${normalized.length} suggestions`);
        res.json({ suggestions: normalized });
    } catch (err) {
        next(err);
    }
}
