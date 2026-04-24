import { useState, useCallback, useEffect } from "react";
import { useStore } from "./store/useStore";
import { transcribeAudio } from "./services/transcriptionService";
import { useSuggestions } from "./hooks/useSuggestions";
import { useChat } from "./hooks/useChat";
import Header from "./components/layout/Header";
import ThreeColumnLayout from "./components/layout/ThreeColumnLayout";
import TranscriptPanel from "./components/transcript/TranscriptPanel";
import SuggestionsPanel from "./components/suggestions/SuggestionsPanel";
import ChatPanel from "./components/chat/ChatPanel";
import SettingsModal from "./components/settings/SettingsModal";

export default function App() {
    const [showSettings, setShowSettings] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);

    const addTranscriptEntry = useStore((s) => s.addTranscriptEntry);
    const apiKey = useStore((s) => s.apiKey);
    const refreshInterval = useStore((s) => s.refreshInterval);

    const {
        isLoading: suggestionsLoading,
        error: suggestionsError,
        refresh: refreshSuggestions,
        startAutoRefresh,
        stopAutoRefresh,
    } = useSuggestions();

    const { isStreaming, error: chatError, sendSuggestion, sendQuestion } = useChat();

    // Handle each 30s audio chunk from the recorder
    const handleAudioChunk = useCallback(
        async (audioBlob) => {
            if (!apiKey) {
                setShowSettings(true);
                return;
            }

            setIsTranscribing(true);
            try {
                const text = await transcribeAudio(audioBlob);
                if (text && text.trim()) {
                    addTranscriptEntry(text);
                }
            } catch (err) {
                console.error("Transcription error:", err);
            } finally {
                setIsTranscribing(false);
            }
        },
        [apiKey, addTranscriptEntry]
    );

    // Auto-refresh suggestions on interval
    useEffect(() => {
        if (apiKey) {
            startAutoRefresh(refreshInterval);
        }
        return () => stopAutoRefresh();
    }, [apiKey, refreshInterval, startAutoRefresh, stopAutoRefresh]);

    // Show settings on first load if no API key
    useEffect(() => {
        if (!apiKey) {
            setShowSettings(true);
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-slate-950">
            <Header onOpenSettings={() => setShowSettings(true)} />

            <ThreeColumnLayout
                left={<TranscriptPanel onAudioChunk={handleAudioChunk} />}
                middle={
                    <SuggestionsPanel
                        onRefresh={refreshSuggestions}
                        isLoading={suggestionsLoading || isTranscribing}
                        error={!apiKey ? "Set your Groq API key in Settings first." : suggestionsError}
                        onSuggestionClick={sendSuggestion}
                    />
                }
                right={
                    <ChatPanel
                        onSendQuestion={sendQuestion}
                        isStreaming={isStreaming}
                        error={chatError}
                        apiKeyMissing={!apiKey}
                        onOpenSettings={() => setShowSettings(true)}
                    />
                }
            />

            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        </div>
    );
}
