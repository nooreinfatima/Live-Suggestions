import { useCallback, useRef, useState } from "react";
import { useStore } from "../store/useStore";
import { fetchSuggestions } from "../services/suggestionService";

/**
 * Hook for managing suggestion generation — auto-refresh and manual refresh.
 * Includes a concurrency lock to prevent duplicate parallel API calls.
 * @returns {{ isLoading, error, refresh, startAutoRefresh, stopAutoRefresh }}
 */
export function useSuggestions() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);
    const isRefreshingRef = useRef(false);

    const refresh = useCallback(async () => {
        // Concurrency lock — skip if already refreshing
        if (isRefreshingRef.current) {
            return;
        }

        const state = useStore.getState();
        const transcript = state.getFullTranscript();

        if (!transcript || transcript.trim().length === 0) {
            return; // nothing to suggest on
        }

        if (!state.apiKey) {
            setError("Please set your Groq API key in Settings.");
            return;
        }

        isRefreshingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const suggestions = await fetchSuggestions(transcript, {
                contextWindow: state.suggestionContextWindow,
                customPrompt: state.suggestionPrompt,
            });
            state.addSuggestionBatch(suggestions);
        } catch (err) {
            setError(err.message);
        } finally {
            isRefreshingRef.current = false;
            setIsLoading(false);
        }
    }, []);

    const startAutoRefresh = useCallback(
        (intervalSeconds) => {
            stopAutoRefresh();
            intervalRef.current = setInterval(() => {
                refresh();
            }, intervalSeconds * 1000);
        },
        [refresh]
    );

    const stopAutoRefresh = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    return { isLoading, error, refresh, startAutoRefresh, stopAutoRefresh };
}
