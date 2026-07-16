"use client";

import { useRef, useEffect, useState } from "react";

export function useMouseReveal() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleClick = (e) => {
      // Toggle blackboard mode on click for all devices
      setIsHovered((prev) => !prev);
    };

    el.addEventListener("click", handleClick);

    return () => {
      el.removeEventListener("click", handleClick);
    };
  }, []);

  return { ref, isHovered };
}
