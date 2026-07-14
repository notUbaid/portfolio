"use client";

import { useRef, useEffect } from "react";

export function useMouseReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseEvent = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    el.addEventListener("mouseenter", handleMouseEvent);
    el.addEventListener("mouseleave", handleMouseEvent);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEvent);
      el.removeEventListener("mouseleave", handleMouseEvent);
    };
  }, []);

  return { ref };
}
