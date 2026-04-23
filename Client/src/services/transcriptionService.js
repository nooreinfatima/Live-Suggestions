import { postFormData } from "./apiClient";

/**
 * Transcribe an audio blob via the backend Whisper API.
 * @param {Blob} audioBlob - Audio recorded from the mic
 * @returns {Promise<string>} Transcribed text
 */
export async function transcribeAudio(audioBlob) {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");

    const data = await postFormData("/transcribe", formData);
    return data.text;
}
