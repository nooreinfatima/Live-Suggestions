import { useCallback, useState } from "react";
import { useStore } from "../store/useStore";
import { sendChatMessage } from "../services/chatService";

/**
 * Hook for managing chat interactions — suggestion expansions and direct questions.
 * @returns {{ isStreaming, error, sendSuggestion, sendQuestion }}
 */
export function useChat() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);

    const sendSuggestion = useCallback(async (suggestion) => {
        const state = useStore.getState();

        if (!state.apiKey) {
            setError("Please set your Groq API key in Settings first.");
            return;
        }

        setError(null);

        // Add the user message (suggestion click)
        state.addChatMessage("user", `📌 **${suggestion.title}**\n\n${suggestion.preview}`, {
            isSuggestion: true,
        });

        // Add an empty assistant message to stream into
        state.addChatMessage("assistant", "");

        setIsStreaming(true);

        await sendChatMessage(
            {
                transcript: state.getFullTranscript(),
                suggestion,
                chatHistory: state.getChatHistory().slice(0, -1), // exclude the empty one
                customPrompt: state.detailPrompt,
                detailContextWindow: state.detailContextWindow,
            },
            {
                onChunk: (content) => {
                    useStore.getState().appendToLastMessage(content);
                },
                onDone: () => {
                    setIsStreaming(false);
                },
                onError: (err) => {
                    setError(err.message);
                    setIsStreaming(false);
                    useStore.getState().appendToLastMessage("\n\n⚠️ Error: " + err.message);
                },
            }
        );
    }, []);

    const sendQuestion = useCallback(async (question) => {
        const state = useStore.getState();

        if (!state.apiKey) {
            setError("Please set your Groq API key in Settings first.");
            return;
        }

        if (!question.trim()) return;

        setError(null);

        // Add user question
        state.addChatMessage("user", question);

        // Add empty assistant message to stream into
        state.addChatMessage("assistant", "");

        setIsStreaming(true);

        await sendChatMessage(
            {
                transcript: state.getFullTranscript() || " ",
                question,
                chatHistory: state.getChatHistory().slice(0, -1),
                customPrompt: state.chatPrompt,
                detailContextWindow: state.detailContextWindow,
            },
            {
                onChunk: (content) => {
                    useStore.getState().appendToLastMessage(content);
                },
                onDone: () => {
                    setIsStreaming(false);
                },
                onError: (err) => {
                    setError(err.message);
                    setIsStreaming(false);
                    useStore.getState().appendToLastMessage("\n\n⚠️ Error: " + err.message);
                },
            }
        );
    }, []);

    return { isStreaming, error, sendSuggestion, sendQuestion };
}
