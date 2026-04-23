/**
 * Suggestion store slice — manages batches of 3 suggestions.
 */
export const createSuggestionSlice = (set) => ({
    suggestionBatches: [],

    addSuggestionBatch: (suggestions) => {
        const batch = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            suggestions, // array of { type, title, preview }
        };
        // Prepend new batch at the top
        set((state) => ({
            suggestionBatches: [batch, ...state.suggestionBatches],
        }));
    },

    clearSuggestions: () => set({ suggestionBatches: [] }),
});
