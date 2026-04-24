import SuggestionCard from "./SuggestionCard";
import { formatTime } from "../../utils/formatters";

export default function SuggestionBatch({ batch, onSuggestionClick }) {
    return (
        <div className="px-3 py-3">
            {/* Batch timestamp */}
            <div className="flex items-center gap-2 mb-2.5">
                <div className="h-px flex-1 bg-purple-900/30" />
                <span className="text-xs text-purple-400/50 font-mono">
                    {formatTime(batch.timestamp)}
                </span>
                <div className="h-px flex-1 bg-purple-900/30" />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2.5">
                {batch.suggestions.map((suggestion, idx) => (
                    <SuggestionCard
                        key={`${batch.id}-${idx}`}
                        suggestion={suggestion}
                        onClick={onSuggestionClick}
                    />
                ))}
            </div>
        </div>
    );
}
