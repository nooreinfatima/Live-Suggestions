import {
    DEFAULT_SUGGESTION_PROMPT,
    DEFAULT_DETAIL_PROMPT,
    DEFAULT_CHAT_PROMPT,
} from "../../utils/constants";

const STORAGE_KEY = "twinmind-settings";
const DEFAULT_API_KEY = "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";

/**
 * Load persisted settings from localStorage.
 */
function loadPersistedSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {
        // ignore parse errors
    }
    return {};
}

/**
 * Persist settings to localStorage.
 */
function persistSettings(state) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                apiKey: state.apiKey,
                suggestionPrompt: state.suggestionPrompt,
                detailPrompt: state.detailPrompt,
                chatPrompt: state.chatPrompt,
                suggestionContextWindow: state.suggestionContextWindow,
                detailContextWindow: state.detailContextWindow,
                refreshInterval: state.refreshInterval,
            })
        );
    } catch {
        // ignore storage errors
    }
}

/**
 * Settings store slice — API key, prompts, and context windows.
 * Persisted to localStorage so settings survive page reloads.
 */
export const createSettingsSlice = (set, get) => {
    const persisted = loadPersistedSettings();

    /** Helper: set state + persist */
    const setAndPersist = (partial) => {
        set(partial);
        // Persist after state is updated
        setTimeout(() => persistSettings(get()), 0);
    };

    return {
        apiKey: persisted.apiKey ?? DEFAULT_API_KEY,
        suggestionPrompt: persisted.suggestionPrompt ?? DEFAULT_SUGGESTION_PROMPT,
        detailPrompt: persisted.detailPrompt ?? DEFAULT_DETAIL_PROMPT,
        chatPrompt: persisted.chatPrompt ?? DEFAULT_CHAT_PROMPT,
        suggestionContextWindow: persisted.suggestionContextWindow ?? 3000,
        detailContextWindow: persisted.detailContextWindow ?? 10000,
        refreshInterval: persisted.refreshInterval ?? 30,

        setApiKey: (key) => setAndPersist({ apiKey: key }),
        setSuggestionPrompt: (prompt) => setAndPersist({ suggestionPrompt: prompt }),
        setDetailPrompt: (prompt) => setAndPersist({ detailPrompt: prompt }),
        setChatPrompt: (prompt) => setAndPersist({ chatPrompt: prompt }),
        setSuggestionContextWindow: (size) => setAndPersist({ suggestionContextWindow: size }),
        setDetailContextWindow: (size) => setAndPersist({ detailContextWindow: size }),
        setRefreshInterval: (seconds) => setAndPersist({ refreshInterval: seconds }),

        resetToDefaults: () =>
            setAndPersist({
                suggestionPrompt: DEFAULT_SUGGESTION_PROMPT,
                detailPrompt: DEFAULT_DETAIL_PROMPT,
                chatPrompt: DEFAULT_CHAT_PROMPT,
                suggestionContextWindow: 3000,
                detailContextWindow: 10000,
                refreshInterval: 30,
            }),
    };
};
