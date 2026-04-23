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
        <header className="flex items-center justify-between px-6 py-3 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    T
                </div>
                <h1 className="text-lg font-semibold text-white tracking-tight">
                    TwinMind
                </h1>
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                    Live Suggestions
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm transition-all duration-200 border border-gray-700"
                >
                    {exported ? "✅ Exported!" : "📥 Export"}
                </button>

                <button
                    onClick={onOpenSettings}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 border border-gray-700"
                    title="Settings"
                >
                    ⚙️
                </button>
            </div>
        </header>
    );
}
