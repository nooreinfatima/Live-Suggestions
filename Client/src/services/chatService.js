import { postStream } from "./apiClient";

/**
 * Send a chat message (suggestion click or direct question) and stream the response.
 * @param {object} payload - { transcript, suggestion?, question?, chatHistory, customPrompt, detailContextWindow }
 * @param {object} callbacks - { onChunk, onDone, onError }
 */
export function sendChatMessage(payload, callbacks) {
    return postStream("/chat", payload, callbacks);
}
