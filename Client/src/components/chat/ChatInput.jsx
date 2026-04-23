import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text.trim());
            setText("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 border-t border-gray-800 bg-gray-900/50"
        >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask a question about the meeting…"
                disabled={disabled}
                className="flex-1 bg-gray-800/60 text-sm text-gray-200 placeholder-gray-500 rounded-xl px-4 py-2.5 border border-gray-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={disabled || !text.trim()}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:text-gray-500 text-white transition-all duration-200 text-sm"
            >
                ➤
            </button>
        </form>
    );
}
