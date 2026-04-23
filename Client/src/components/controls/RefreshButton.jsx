export default function RefreshButton({ onClick, isLoading }) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${isLoading
                    ? "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                    : "bg-indigo-500/15 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/25"
                }`}
        >
            <span className={`text-sm ${isLoading ? "animate-spin" : ""}`}>🔄</span>
            {isLoading ? "Loading…" : "Refresh"}
        </button>
    );
}
