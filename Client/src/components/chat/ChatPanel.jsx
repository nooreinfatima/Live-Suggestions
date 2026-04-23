import { useStore } from "../../store/useStore";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatPanel({ onSendQuestion, isStreaming, error, apiKeyMissing, onOpenSettings }) {
    const messages = useStore((s) => s.chatMessages);
    const scrollRef = useAutoScroll([messages]);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    💬 Chat
                </h2>
                {isStreaming && (
                    <span className="text-[10px] text-indigo-400 animate-pulse">Generating…</span>
                )}
            </div>

            {/* API Key Warning */}
            {apiKeyMissing && (
                <div className="mx-3 mt-2 px-3 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs text-amber-400 font-medium">⚠️ Groq API key is required</p>
                    <p className="text-[11px] text-amber-400/70 mt-0.5">
                        Click{" "}
                        <button onClick={onOpenSettings} className="underline hover:text-amber-300">
                            Settings ⚙️
                        </button>{" "}
                        to enter your API key.
                    </p>
                </div>
            )}

            {/* Error banner */}
            {error && (
                <div className="mx-3 mt-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    ⚠️ {error}
                </div>
            )}

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 px-8 text-center">
                        <div className="text-4xl mb-3">💬</div>
                        <p className="text-sm">Chat responses will appear here.</p>
                        <p className="text-xs mt-1 text-gray-600">
                            Click a suggestion or type a question below.
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
                )}
            </div>

            {/* Input */}
            <ChatInput onSend={onSendQuestion} disabled={isStreaming || apiKeyMissing} />
        </div>
    );
}
