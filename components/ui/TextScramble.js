"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { playClickSound } from "@/lib/audio";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function TextScramble({
  text,
  as: Component = "span",
  className = "",
  speed = 35,
  triggerOnHover = true,
  triggerInView = true,
  style = {},
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const frameRef = useRef(null);
  const elementRef = useRef(null);

  const scramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    playClickSound();

    let iteration = 0;
    const maxIterations = text.length * 3;

    const step = () => {
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
    if (!triggerInView || !elementRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [triggerInView, scramble]);

  useEffect(() => {
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, []);

  return (
    <Component
      ref={elementRef}
      className={className}
      style={{ cursor: triggerOnHover ? "pointer" : "default", ...style }}
      onMouseEnter={triggerOnHover ? scramble : undefined}
      {...props}
    >
      {displayText}
    </Component>
  );
}
