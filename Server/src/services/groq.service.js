import Groq from "groq-sdk";
import logger from "../utils/logger.js";

/**
 * Create a Groq client instance for a given API key.
 * We create per-request instances so each user uses their own key.
 */
function createClient(apiKey) {
    return new Groq({ apiKey });
}

/**
 * Transcribe an audio buffer using Whisper Large V3 via Groq.
 * @param {Buffer} audioBuffer - Raw audio data
 * @param {string} apiKey - User's Groq API key
 * @returns {Promise<string>} Transcribed text
 */
export async function transcribeAudio(audioBuffer, apiKey) {
    const client = createClient(apiKey);

    // Groq expects a File-like object
    const file = new File([audioBuffer], "audio.webm", { type: "audio/webm" });

    const transcription = await client.audio.transcriptions.create({
        file,
        model: "whisper-large-v3",
        response_format: "text",
    });

    logger.info(`Transcribed ${audioBuffer.length} bytes → ${transcription.length} chars`);
    return transcription;
}

/**
 * Generate a chat completion (non-streaming).
 * Used for suggestion generation where we need the full JSON response.
 * @param {Array} messages - OpenAI-format messages array
 * @param {string} apiKey - User's Groq API key
 * @returns {Promise<string>} The assistant's response content
 */
export async function generateCompletion(messages, apiKey) {
    const client = createClient(apiKey);

    const completion = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages,
        temperature: 0.7,
        max_completion_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "";
}

/**
 * Stream a chat completion via SSE.
 * Used for chat responses where first-token latency matters.
 * @param {Array} messages - OpenAI-format messages array
 * @param {string} apiKey - User's Groq API key
 * @returns {AsyncIterable} Stream of completion chunks
 */
export async function streamCompletion(messages, apiKey) {
    const client = createClient(apiKey);

    const stream = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages,
        temperature: 0.7,
        max_completion_tokens: 2048,
        stream: true,
    });

    return stream;
}
