import { useStore } from "../../store/useStore";
import SuggestionBatch from "./SuggestionBatch";
import RefreshButton from "../controls/RefreshButton";

export default function SuggestionsPanel({ onRefresh, isLoading, error, onSuggestionClick }) {
    const batches = useStore((s) => s.suggestionBatches);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-purple-900/30 bg-gray-900/60">
                <h2 className="text-base font-semibold text-purple-300 uppercase tracking-wider">
                    💡 Suggestions
                </h2>
                <RefreshButton onClick={onRefresh} isLoading={isLoading} />
            </div>

            {/* Error banner */}
            {error && (
                <div className="mx-3 mt-2 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    ⚠️ {error}
                </div>
            )}

            {/* Suggestion batches */}
            <div className="flex-1 overflow-y-auto">
                {batches.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 px-8 text-center">
                        <p className="text-base">🔮 No suggestions yet</p>
                        <p className="text-sm mt-1.5 text-slate-500">
                            Start recording and suggestions will refresh every ~30s.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-purple-900/20">
                        {batches.map((batch) => (
                            <SuggestionBatch
                                key={batch.id}
                                batch={batch}
                                onSuggestionClick={onSuggestionClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
