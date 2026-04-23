import { SUGGESTION_TYPE_CONFIG } from "../../utils/constants";

export default function SuggestionCard({ suggestion, onClick }) {
    const config = SUGGESTION_TYPE_CONFIG[suggestion.type] || SUGGESTION_TYPE_CONFIG.talking_point;

    const colorMap = {
        blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-400/50",
        purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-400/50",
        green: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 hover:border-emerald-400/50",
        amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 hover:border-amber-400/50",
        cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-400/50",
    };

    const badgeColorMap = {
        blue: "bg-blue-500/20 text-blue-300",
        purple: "bg-purple-500/20 text-purple-300",
        green: "bg-emerald-500/20 text-emerald-300",
        amber: "bg-amber-500/20 text-amber-300",
        cyan: "bg-cyan-500/20 text-cyan-300",
    };

    return (
        <button
            onClick={() => onClick(suggestion)}
            className={`w-full text-left p-3.5 rounded-xl bg-gradient-to-br ${colorMap[config.color]} border transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer group`}
        >
            {/* Type badge */}
            <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeColorMap[config.color]}`}>
                    {config.icon} {config.label}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-white/90">
                {suggestion.title}
            </h3>

            {/* Preview */}
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                {suggestion.preview}
            </p>

            {/* Click hint */}
            <div className="mt-2 text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">
                Click for detailed answer →
            </div>
        </button>
    );
}
