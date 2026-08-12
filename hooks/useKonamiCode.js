"use client";

import { useEffect, useRef } from "react";
import { playSuccessSound } from "@/lib/audio";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onSuccess) {
  const inputRef = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      inputRef.current.push(key);

      if (inputRef.current.length > KONAMI_CODE.length) {
        inputRef.current.shift();
      }

      if (
        inputRef.current.length === KONAMI_CODE.length &&
        inputRef.current.every((k, i) => k === KONAMI_CODE[i])
      ) {
        playSuccessSound();

        // Trigger physics blocks drop
        if (typeof document !== "undefined") {
          const pills = document.querySelectorAll("[data-text]");
          pills.forEach((pill) => {
            if (pill instanceof HTMLElement) pill.click();
          });
        }

        if (onSuccess) onSuccess();
        inputRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSuccess]);
}
