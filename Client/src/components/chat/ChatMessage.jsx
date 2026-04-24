import { formatTime } from "../../utils/formatters";

export default function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1.5`}>
            <div
                className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${isUser
                    ? "bg-purple-600/20 text-purple-100 border border-purple-500/20"
                    : "bg-slate-800/70 text-slate-200 border border-slate-700/50"
                    }`}
            >
                <div className="whitespace-pre-wrap break-words chat-content">
                    {message.content || (
                        <span className="inline-flex gap-1 text-purple-400">
                            <span className="animate-bounce">●</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>●</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                        </span>
                    )}
                </div>
                <div className={`text-[10px] mt-1.5 ${isUser ? "text-purple-400/50" : "text-slate-500"}`}>
                    {formatTime(message.timestamp)}
                </div>
            </div>
        </div>
    );
}
