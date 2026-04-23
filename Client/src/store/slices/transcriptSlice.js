/**
 * Transcript store slice — manages live transcript entries.
 */
export const createTranscriptSlice = (set, get) => ({
    transcriptEntries: [],

    addTranscriptEntry: (text) => {
        const entry = {
            id: Date.now(),
            text: text.trim(),
            timestamp: new Date().toISOString(),
        };
        set((state) => ({
            transcriptEntries: [...state.transcriptEntries, entry],
        }));
    },

    getFullTranscript: () => {
        return get()
            .transcriptEntries.map((e) => e.text)
            .join(" ");
    },

    clearTranscript: () => set({ transcriptEntries: [] }),
});
