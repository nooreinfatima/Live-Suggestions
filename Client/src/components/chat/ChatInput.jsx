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
            className="flex items-center gap-2 px-4 py-3 border-t border-purple-900/30 bg-gray-900/60"
        >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="💬 Ask a question about the meeting…"
                disabled={disabled}
                className="flex-1 bg-slate-800 text-sm text-slate-200 placeholder-slate-500 rounded-md px-4 py-2.5 border border-purple-700/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-colors duration-150 disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={disabled || !text.trim()}
                className="flex items-center justify-center w-9 h-9 rounded-md bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-colors duration-150 text-sm shadow-lg shadow-purple-600/20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
            </button>
        </form>
    );
}
