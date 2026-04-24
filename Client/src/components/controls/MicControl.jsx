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
                    {error}
                </span>
            )}

            <button
                onClick={toggle}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 border ${isRecording
                    ? "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25"
                    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                    }`}
            >
                {isRecording && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {isRecording ? (
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                    ) : (
                        <>
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </>
                    )}
                </svg>
                {isRecording ? "Stop" : "Start"}
            </button>
        </div>
    );
}