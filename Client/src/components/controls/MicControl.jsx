import { useAudioRecorder } from "../../hooks/useAudioRecorder";

export default function MicControl({ onAudioChunk }) {
    const { isRecording, start, stop, error } = useAudioRecorder(onAudioChunk);

    const toggle = () => {
        if (isRecording) {
            stop();
        } else {
            start();
        }
    };

    return (
        <div className="flex items-center gap-2">
            {error && (
                <span className="text-xs text-red-400" title={error}>
                    ⚠️ {error}
                </span>
            )}

            <button
                onClick={toggle}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${isRecording
                        ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                    }`}
            >
                {isRecording && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
                <span className="text-sm">{isRecording ? "⏹" : "🎙"}</span>
                {isRecording ? "Stop" : "Start"}
            </button>
        </div>
    );
}