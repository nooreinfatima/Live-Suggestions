import { postJSON } from "./apiClient";

/**
 * Fetch 3 suggestions based on the current transcript.
 * @param {string} transcript - Full or windowed transcript
 * @param {object} settings - { contextWindow, customPrompt }
 * @returns {Promise<Array>} Array of suggestion objects
 */
export async function fetchSuggestions(transcript, settings = {}) {
    const body = {
        transcript,
        contextWindow: settings.contextWindow || 3000,
        customPrompt: settings.customPrompt || undefined,
    };

    const data = await postJSON("/suggestions", body);
    return data.suggestions;
}
