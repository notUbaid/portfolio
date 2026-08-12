"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { playScrambleSound } from "@/lib/audio";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function TextScramble({
  text,
  as: Component = "span",
  className = "",
  speed = 35,
  triggerOnHover = true,
  style = {},
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const frameRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scramble = useCallback(() => {
    if (isAnimating.current || isScrollingRef.current) return;
    isAnimating.current = true;

    let iteration = 0;
    const maxIterations = text.length * 3;

    const step = () => {
      playScrambleSound();
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < maxIterations) {
        iteration++;
        frameRef.current = setTimeout(step, speed);
      } else {
        setDisplayText(text);
        isAnimating.current = false;
      }
    };

    step();
  }, [text, speed]);

  useEffect(() => {
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScrollingRef.current) {
      scramble();
    }
  };

  return (
    <Component
      className={className}
      style={{ cursor: triggerOnHover ? "pointer" : "default", ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      {...props}
    >
      {displayText}
    </Component>
  );
}
