import { formatTime } from "../../utils/formatters";

export default function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1.5`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isUser
                        ? "bg-indigo-600/30 text-indigo-100 border border-indigo-500/20 rounded-br-md"
                        : "bg-gray-800/70 text-gray-200 border border-gray-700/50 rounded-bl-md"
                    }`}
            >
                {/* Simple markdown-ish rendering */}
                <div className="whitespace-pre-wrap break-words chat-content">
                    {message.content || (
                        <span className="inline-flex gap-1 text-gray-500">
                            <span className="animate-bounce">●</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>●</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                        </span>
                    )}
                </div>
                <div className={`text-[10px] mt-1.5 ${isUser ? "text-indigo-400/60" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                </div>
            </div>
        </div>
    );
}
