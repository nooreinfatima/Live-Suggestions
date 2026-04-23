export default function PromptEditor({ label, value, onChange, rows = 6 }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {label}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className="w-full bg-gray-800/60 text-sm text-gray-200 rounded-lg px-3 py-2.5 border border-gray-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 resize-y font-mono text-xs leading-relaxed"
            />
        </div>
    );
}
