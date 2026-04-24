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
            <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <h2 className="text-base font-semibold text-slate-100">Settings</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-120px)] space-y-5">
                    {/* API Key */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Groq API Key
                        </label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="gsk_..."
                            className="w-full bg-slate-800 text-sm text-slate-200 placeholder-slate-500 rounded-md px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors duration-150"
                        />
                    </div>

                    {/* Numeric settings */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Refresh Interval (s)
                            </label>
                            <input
                                type="number"
                                value={refreshInterval}
                                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                                min={10}
                                max={120}
                                className="w-full bg-slate-800 text-sm text-slate-200 rounded-md px-3 py-2 border border-slate-700 focus:outline-none focus:border-blue-500/50 transition-colors duration-150"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Suggestion Context
                            </label>
                            <input
                                type="number"
                                value={suggestionContextWindow}
                                onChange={(e) => setSuggestionContextWindow(Number(e.target.value))}
                                min={500}
                                max={10000}
                                step={500}
                                className="w-full bg-slate-800 text-sm text-slate-200 rounded-md px-3 py-2 border border-slate-700 focus:outline-none focus:border-blue-500/50 transition-colors duration-150"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Detail Context
                            </label>
                            <input
                                type="number"
                                value={detailContextWindow}
                                onChange={(e) => setDetailContextWindow(Number(e.target.value))}
                                min={1000}
                                max={20000}
                                step={1000}
                                className="w-full bg-slate-800 text-sm text-slate-200 rounded-md px-3 py-2 border border-slate-700 focus:outline-none focus:border-blue-500/50 transition-colors duration-150"
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
                <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800">
                    <button
                        onClick={resetToDefaults}
                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Reset prompts to defaults
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-150"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
