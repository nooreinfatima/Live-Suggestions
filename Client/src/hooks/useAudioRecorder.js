import { useRef, useCallback, useState } from "react";

/**
 * Custom hook for audio recording using MediaRecorder API.
 * Records in 30-second chunks and calls onChunk(blob) for each chunk.
 *
 * @param {function} onChunk - Callback receiving each audio Blob
 * @param {number} chunkInterval - Interval in ms between chunks (default 30000)
 * @returns {{ isRecording, start, stop, error }}
 */
export function useAudioRecorder(onChunk, chunkInterval = 30000) {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);

    const start = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
                ? "audio/webm;codecs=opus"
                : "audio/webm";

            const recorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = recorder;

            let chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                if (chunks.length > 0) {
                    const blob = new Blob(chunks, { type: mimeType });
                    onChunk(blob);
                    chunks = [];
                }
            };

            // Start recording
            recorder.start();
            setIsRecording(true);

            // Set up periodic chunk collection every chunkInterval ms
            intervalRef.current = setInterval(() => {
                if (recorder.state === "recording") {
                    recorder.stop();
                    // Restart recording immediately after stopping to collect the chunk
                    setTimeout(() => {
                        if (streamRef.current && streamRef.current.active) {
                            const newRecorder = new MediaRecorder(stream, { mimeType });
                            let newChunks = [];

                            newRecorder.ondataavailable = (e) => {
                                if (e.data.size > 0) {
                                    newChunks.push(e.data);
                                }
                            };

                            newRecorder.onstop = () => {
                                if (newChunks.length > 0) {
                                    const blob = new Blob(newChunks, { type: mimeType });
                                    onChunk(blob);
                                    newChunks = [];
                                }
                            };

                            newRecorder.start();
                            mediaRecorderRef.current = newRecorder;
                        }
                    }, 100);
                }
            }, chunkInterval);
        } catch (err) {
            setError(err.message || "Failed to access microphone");
            setIsRecording(false);
        }
    }, [onChunk, chunkInterval]);

    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        setIsRecording(false);
    }, []);

    return { isRecording, start, stop, error };
}
