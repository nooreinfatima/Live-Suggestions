import { useEffect, useRef } from "react";

/**
 * Auto-scrolls a container to the bottom whenever deps change.
 * @param {Array} deps - Dependencies that trigger a scroll
 * @returns {React.RefObject} Ref to attach to the scrollable container
 */
export function useAutoScroll(deps = []) {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, deps);

    return containerRef;
}
