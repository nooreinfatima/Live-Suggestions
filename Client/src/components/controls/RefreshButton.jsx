export default function RefreshButton({ onClick, isLoading }) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 border ${isLoading
                ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
                : "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20"
                }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isLoading ? "animate-spin" : ""}>
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            {isLoading ? "⏳ Loading…" : "🔄 Refresh"}
        </button>
    );
}
