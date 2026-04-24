import { useStore } from "../../store/useStore";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import TranscriptItem from "./TranscriptItem";
import MicControl from "../controls/MicControl";

export default function TranscriptPanel({ onAudioChunk }) {
    const entries = useStore((s) => s.transcriptEntries);
    const scrollRef = useAutoScroll([entries]);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-purple-900/30 bg-gray-900/60">
                <h2 className="text-base font-semibold text-purple-300 uppercase tracking-wider">
                    📝 Transcript
                </h2>
                <MicControl onAudioChunk={onAudioChunk} />
            </div>

            {/* Transcript content */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
                {entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 px-8 text-center">
                        <p className="text-base">📭 No transcript yet</p>
                        <p className="text-sm mt-1.5 text-slate-500">
                            Click the mic button to start recording.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-purple-900/20">
                        {entries.map((entry) => (
                            <TranscriptItem key={entry.id} entry={entry} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
