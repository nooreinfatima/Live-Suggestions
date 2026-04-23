import { useStore } from "../store/useStore";

/**
 * Export the full session as a JSON file download.
 * Includes transcript, all suggestion batches, and full chat history with timestamps.
 */
export function exportSession() {
    const state = useStore.getState();

    const session = {
        exportedAt: new Date().toISOString(),
        transcript: state.transcriptEntries.map((e) => ({
            timestamp: e.timestamp,
            text: e.text,
        })),
        suggestionBatches: state.suggestionBatches.map((b) => ({
            timestamp: b.timestamp,
            suggestions: b.suggestions,
        })),
        chatHistory: state.chatMessages.map((m) => ({
            timestamp: m.timestamp,
            role: m.role,
            content: m.content,
        })),
    };

    const blob = new Blob([JSON.stringify(session, null, 2)], {
        type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `twinmind-session-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
