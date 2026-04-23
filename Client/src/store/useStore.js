import { create } from "zustand";
import { createTranscriptSlice } from "./slices/transcriptSlice";
import { createSuggestionSlice } from "./slices/suggestionSlice";
import { createChatSlice } from "./slices/chatSlice";
import { createSettingsSlice } from "./slices/settingsSlice";

/**
 * Combined Zustand store — merges all slices into a single store.
 */
export const useStore = create((...args) => ({
    ...createTranscriptSlice(...args),
    ...createSuggestionSlice(...args),
    ...createChatSlice(...args),
    ...createSettingsSlice(...args),
}));
