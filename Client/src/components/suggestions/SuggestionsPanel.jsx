import { useStore } from "../../store/useStore";
import SuggestionBatch from "./SuggestionBatch";
import RefreshButton from "../controls/RefreshButton";

export default function SuggestionsPanel({ onRefresh, isLoading, error, onSuggestionClick }) {
    const batches = useStore((s) => s.suggestionBatches);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    💡 Suggestions
                </h2>
                <RefreshButton onClick={onRefresh} isLoading={isLoading} />
            </div>

            {/* Error banner */}
            {error && (
                <div className="mx-3 mt-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    {error}
                </div>
            )}

            {/* Suggestion batches */}
            <div className="flex-1 overflow-y-auto">
                {batches.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 px-8 text-center">
                        <div className="text-4xl mb-3">💡</div>
                        <p className="text-sm">Suggestions will appear here.</p>
                        <p className="text-xs mt-1 text-gray-600">
                            Start recording and they'll refresh every ~30 seconds.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-800/30">
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
