import { useState } from "react";
import { exportSession } from "../../utils/exportSession";

export default function Header({ onOpenSettings }) {
    const [exported, setExported] = useState(false);

    const handleExport = () => {
        exportSession();
        setExported(true);
        setTimeout(() => setExported(false), 2000);
    };

    return (
        <header className="flex items-center justify-between px-6 py-3 bg-gray-900/80 backdrop-blur-md border-b border-purple-900/40 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
                    🧠
                </div>
                <h1 className="text-2xl font-semibold text-white tracking-tight">
                    TwinMind
                </h1>
                <span className="text-sm text-purple-300/60 font-medium hidden sm:inline">
                    ✨ Live Suggestions
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-900/30 hover:bg-purple-800/40 text-purple-200 hover:text-white text-sm transition-all duration-200 border border-purple-700/30"
                >
                    {exported ? "✅ Exported!" : "📥 Export"}
                </button>

                <button
                    onClick={onOpenSettings}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-900/30 hover:bg-purple-800/40 text-purple-300 hover:text-white transition-all duration-200 border border-purple-700/30"
                    title="Settings"
                >
                    ⚙️
                </button>
            </div>
        </header>
    );
}
