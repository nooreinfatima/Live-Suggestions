export default function PromptEditor({ label, value, onChange, rows = 6 }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {label}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className="w-full bg-slate-800 text-sm text-slate-200 rounded-md px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors duration-150 resize-y font-mono text-xs leading-relaxed"
            />
        </div>
    );
}
