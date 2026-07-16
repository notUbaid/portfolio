"use client";

import { useRef, useEffect, useState } from "react";

export function useMouseReveal() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if device supports true hover (desktop)
    const hasHover = window.matchMedia("(hover: hover)").matches;

    const handleEnter = (e) => {
      if (!hasHover) return;
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => setIsHovered(true), 30);
    };

    const handleLeave = (e) => {
      if (!hasHover) return;
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => setIsHovered(false), 50);
    };

    const handleClick = (e) => {
      if (!hasHover) {
        // Toggle on mobile/touch
        setIsHovered((prev) => !prev);
      }
    };

    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);
    el.addEventListener("click", handleClick);

    return () => {
      clearTimeout(hoverTimeout.current);
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
      el.removeEventListener("click", handleClick);
    };
  }, []);

  return { ref, isHovered };
}
