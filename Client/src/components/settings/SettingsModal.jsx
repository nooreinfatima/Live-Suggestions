import { useStore } from "../../store/useStore";
import PromptEditor from "./PromptEditor";

export default function SettingsModal({ onClose }) {
    const {
        apiKey, setApiKey,
        suggestionPrompt, setSuggestionPrompt,
        detailPrompt, setDetailPrompt,
        chatPrompt, setChatPrompt,
        suggestionContextWindow, setSuggestionContextWindow,
        detailContextWindow, setDetailContextWindow,
        refreshInterval, setRefreshInterval,
        resetToDefaults,
    } = useStore();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                    <h2 className="text-lg font-semibold text-white">⚙️ Settings</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-120px)] space-y-5">
                    {/* API Key */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Groq API Key
                        </label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="gsk_..."
                            className="w-full bg-gray-800/60 text-sm text-gray-200 placeholder-gray-500 rounded-lg px-3 py-2.5 border border-gray-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                        />

                    </div>

                    {/* Numeric settings */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Refresh Interval (s)
                            </label>
                            <input
                                type="number"
                                value={refreshInterval}
                                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                                min={10}
                                max={120}
                                className="w-full bg-gray-800/60 text-sm text-gray-200 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Suggestion Context
                            </label>
                            <input
                                type="number"
                                value={suggestionContextWindow}
                                onChange={(e) => setSuggestionContextWindow(Number(e.target.value))}
                                min={500}
                                max={10000}
                                step={500}
                                className="w-full bg-gray-800/60 text-sm text-gray-200 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Detail Context
                            </label>
                            <input
                                type="number"
                                value={detailContextWindow}
                                onChange={(e) => setDetailContextWindow(Number(e.target.value))}
                                min={1000}
                                max={20000}
                                step={1000}
                                className="w-full bg-gray-800/60 text-sm text-gray-200 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Prompt editors */}
                    <PromptEditor
                        label="Live Suggestion Prompt"
                        value={suggestionPrompt}
                        onChange={setSuggestionPrompt}
                        rows={8}
                    />
                    <PromptEditor
                        label="Detail Answer Prompt (on click)"
                        value={detailPrompt}
                        onChange={setDetailPrompt}
                        rows={4}
                    />
                    <PromptEditor
                        label="Direct Chat Prompt"
                        value={chatPrompt}
                        onChange={setChatPrompt}
                        rows={4}
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800">
                    <button
                        onClick={resetToDefaults}
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        Reset prompts to defaults
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
