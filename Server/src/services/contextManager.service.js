/**
 * Context Manager — handles trimming transcript to appropriate context windows.
 *
 * For suggestions: we use a smaller window (last ~3000 chars by default)
 * so the model focuses on what's being said RIGHT NOW.
 *
 * For detail/chat: we use the full transcript so the model has complete context.
 */

/** Default context windows (in characters) */
export const DEFAULT_SUGGESTION_CONTEXT_WINDOW = 3000;
export const DEFAULT_DETAIL_CONTEXT_WINDOW = 10000;

/**
 * Trim transcript to fit within a context window.
 * Trims from the beginning to keep the most recent content.
 * @param {string} transcript - Full transcript text
 * @param {number} maxChars - Maximum characters to keep
 * @returns {string} Trimmed transcript
 */
export function trimToContextWindow(transcript, maxChars) {
    if (!transcript || transcript.length <= maxChars) {
        return transcript || "";
    }
    // Find the first sentence boundary after the cut point
    const cutPoint = transcript.length - maxChars;
    const nextPeriod = transcript.indexOf(". ", cutPoint);
    const start = nextPeriod !== -1 && nextPeriod < cutPoint + 200
        ? nextPeriod + 2
        : cutPoint;
    return "..." + transcript.slice(start);
}

/**
 * Prepare the transcript context for suggestion generation.
 */
export function getSuggestionContext(transcript, contextWindow) {
    const window = contextWindow || DEFAULT_SUGGESTION_CONTEXT_WINDOW;
    return trimToContextWindow(transcript, window);
}

/**
 * Prepare the transcript context for detailed answers / chat.
 */
export function getDetailContext(transcript, contextWindow) {
    const window = contextWindow || DEFAULT_DETAIL_CONTEXT_WINDOW;
    return trimToContextWindow(transcript, window);
}
