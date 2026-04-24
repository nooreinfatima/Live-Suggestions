import { SUGGESTION_TYPE_CONFIG } from "../../utils/constants";

export default function SuggestionCard({ suggestion, onClick }) {
    const config = SUGGESTION_TYPE_CONFIG[suggestion.type] || SUGGESTION_TYPE_CONFIG.talking_point;

    const accentMap = {
        purple: "border-l-purple-500 bg-purple-500/5",
        slate: "border-l-slate-400 bg-slate-500/5",
        emerald: "border-l-emerald-500 bg-emerald-500/5",
        amber: "border-l-amber-500 bg-amber-500/5",
        pink: "border-l-pink-500 bg-pink-500/5",
    };

    const badgeMap = {
        purple: "text-purple-400 bg-purple-500/10",
        slate: "text-slate-400 bg-slate-500/10",
        emerald: "text-emerald-400 bg-emerald-500/10",
        amber: "text-amber-400 bg-amber-500/10",
        pink: "text-pink-400 bg-pink-500/10",
    };

    return (
        <button
            onClick={() => onClick(suggestion)}
            className={`w-full text-left p-3.5 rounded-lg border border-purple-900/30 border-l-2 ${accentMap[config.color]} hover:bg-purple-800/20 transition-colors duration-150 cursor-pointer`}
        >
            {/* Type badge */}
            <div className="mb-2">
                <span className={`text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${badgeMap[config.color]}`}>
                    {config.emoji} {config.label}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-medium text-slate-200 mb-1.5">
                {suggestion.title}
            </h3>

            {/* Preview */}
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                {suggestion.preview}
            </p>

            {/* Click hint */}
            <div className="mt-2.5 text-xs text-purple-400/60">
                👉 Click for details
            </div>
        </button>
    );
}
