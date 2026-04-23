import { formatTime } from "../../utils/formatters";

export default function TranscriptItem({ entry }) {
    return (
        <div className="group px-4 py-2.5 hover:bg-gray-800/50 transition-colors duration-150">
            <span className="text-[10px] text-gray-500 font-mono">
                {formatTime(entry.timestamp)}
            </span>
            <p className="text-sm text-gray-200 leading-relaxed mt-0.5">
                {entry.text}
            </p>
        </div>
    );
}
