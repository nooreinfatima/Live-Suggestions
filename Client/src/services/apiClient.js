import { API_BASE_URL } from "../utils/constants";
import { useStore } from "../store/useStore";

/**
 * Create headers with the user's API key.
 */
function getHeaders(extraHeaders = {}) {
    const apiKey = useStore.getState().apiKey;
    return {
        "x-api-key": apiKey,
        ...extraHeaders,
    };
}

/**
 * Generic JSON POST request.
 */
export async function postJSON(endpoint, body) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { ...getHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || "Request failed");
    }

    return res.json();
}

/**
 * POST form data (for file uploads).
 */
export async function postFormData(endpoint, formData) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: getHeaders(),
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || "Request failed");
    }

    return res.json();
}

/**
 * POST with SSE streaming response.
 * Calls onChunk(text) for each content chunk, onDone() when complete.
 */
export async function postStream(endpoint, body, { onChunk, onDone, onError }) {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { ...getHeaders(), "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(err.message || "Request failed");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith("data: ")) continue;

                const data = trimmed.slice(6);
                if (data === "[DONE]") {
                    onDone?.();
                    return;
                }

                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error) {
                        onError?.(new Error(parsed.error));
                        return;
                    }
                    if (parsed.content) {
                        onChunk?.(parsed.content);
                    }
                } catch {
                    // skip malformed chunks
                }
            }
        }

        onDone?.();
    } catch (err) {
        onError?.(err);
    }
}
