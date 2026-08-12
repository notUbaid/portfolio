"use client";

import { useRef, useEffect } from "react";
import { playClickSound } from "@/lib/audio";

export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animationFrame = null;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${distanceX}px, ${distanceY}px, 0)`;
        el.style.transition = "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      });
    };

    const handleMouseLeave = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      el.style.transform = "translate3d(0px, 0px, 0)";
      el.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };

    const handleClick = () => {
      playClickSound();
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("click", handleClick);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("click", handleClick);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic-wrapper ${className}`} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
