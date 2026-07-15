"use client";

import { useEffect, useRef } from "react";

export default function ChalkTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Track pointer state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // We only want to draw if the user is clicking on empty space
    // not interacting with cards, links, or buttons
    const isInteractiveElement = (element) => {
      return element.closest("a, button, input, textarea, select, details, [role='button'], .ProjectCard, .SkillItem, .experience, .blackboardLayer");
    };

    const handlePointerDown = (e) => {
      if (isInteractiveElement(e.target)) return;
      isDrawing = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!isDrawing) return;

      const x = e.clientX;
      const y = e.clientY;

      drawChalkStroke(lastX, lastY, x, y);

      lastX = x;
      lastY = y;
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    const drawChalkStroke = (x1, y1, x2, y2) => {
      // Create a chalk-like texture by drawing multiple semi-transparent offset lines
      const distance = Math.hypot(x2 - x1, y2 - y1);
      const angle = Math.atan2(y2 - y1, x2 - x1);

      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw standard line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Add "dust" particles along the stroke
      for (let i = 0; i < distance; i += 2) {
        if (Math.random() > 0.5) {
          const px = x1 + Math.cos(angle) * i + (Math.random() - 0.5) * 8;
          const py = y1 + Math.sin(angle) * i + (Math.random() - 0.5) * 8;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4})`;
          ctx.beginPath();
          ctx.arc(px, py, Math.random() * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    // Fade out effect
    const fadeOut = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Fade speed
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(fadeOut);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);

    requestAnimationFrame(fadeOut);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 45, // Underneath sticky nav if any, but above most content
      }}
      aria-hidden="true"
    />
  );
}
