import { formatTime } from "../../utils/formatters";

export default function TranscriptItem({ entry }) {
    return (
        <div className="px-4 py-2.5 hover:bg-purple-900/15 transition-colors duration-150">
            <span className="text-xs text-purple-400/60 font-mono">
                🕐 {formatTime(entry.timestamp)}
            </span>
            <p className="text-base text-slate-200 leading-relaxed mt-0.5">
                {entry.text}
            </p>
        </div>
    );
}
