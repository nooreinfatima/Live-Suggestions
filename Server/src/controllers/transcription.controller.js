import { transcribeAudio } from "../services/groq.service.js";
import logger from "../utils/logger.js";

/**
 * Handle audio transcription requests.
 * Expects multipart form data with an "audio" file field.
 */
export async function handleTranscription(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "Bad Request",
                message: "No audio file provided. Send a file in the 'audio' field.",
            });
        }

        const audioBuffer = req.file.buffer;
        logger.info(`Received audio chunk: ${audioBuffer.length} bytes`);

        const text = await transcribeAudio(audioBuffer, req.apiKey);

        res.json({ text: text.trim() });
    } catch (err) {
        next(err);
    }
}
