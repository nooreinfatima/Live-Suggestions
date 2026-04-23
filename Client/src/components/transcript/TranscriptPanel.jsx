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
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    📝 Transcript
                </h2>
                <MicControl onAudioChunk={onAudioChunk} />
            </div>

            {/* Transcript content */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
                {entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 px-8 text-center">
                        <div className="text-4xl mb-3">🎤</div>
                        <p className="text-sm">Click the mic to start recording.</p>
                        <p className="text-xs mt-1 text-gray-600">
                            Transcript will appear here in real-time.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-800/50">
                        {entries.map((entry) => (
                            <TranscriptItem key={entry.id} entry={entry} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
