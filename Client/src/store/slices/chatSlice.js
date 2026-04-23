/**
 * Chat store slice — manages chat messages.
 */
export const createChatSlice = (set, get) => ({
    chatMessages: [],

    addChatMessage: (role, content, meta = {}) => {
        const message = {
            id: Date.now() + Math.random(),
            role, // "user" | "assistant"
            content,
            timestamp: new Date().toISOString(),
            ...meta,
        };
        set((state) => ({
            chatMessages: [...state.chatMessages, message],
        }));
        return message;
    },

    /** Append streamed content to the last assistant message */
    appendToLastMessage: (content) => {
        set((state) => {
            const msgs = [...state.chatMessages];
            const last = msgs[msgs.length - 1];
            if (last && last.role === "assistant") {
                msgs[msgs.length - 1] = { ...last, content: last.content + content };
            }
            return { chatMessages: msgs };
        });
    },

    getChatHistory: () => {
        return get().chatMessages.map((m) => ({
            role: m.role,
            content: m.content,
        }));
    },

    clearChat: () => set({ chatMessages: [] }),
});
