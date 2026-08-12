"use client";

import { useEffect, useRef } from "react";

export default function ChalkTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable chalk trail on touch devices/mobile to save battery and prevent scroll interference
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }

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
    let animId = null;
    let idleFrames = 0;
    const MAX_IDLE_FRAMES = 50; // Fade frames after releasing mouse before pausing RAF

    const isInteractiveElement = (element) => {
      return element.closest("a, button, input, textarea, select, details, [role='button'], .ProjectCard, .SkillItem, .experience, .blackboardLayer");
    };

    const startAnimation = () => {
      idleFrames = 0;
      if (!animId) {
        animId = requestAnimationFrame(fadeOut);
      }
    };

    const handlePointerDown = (e) => {
      if (isInteractiveElement(e.target)) return;
      isDrawing = true;
      lastX = e.clientX;
      lastY = e.clientY;
      startAnimation();
    };

    const handlePointerMove = (e) => {
      if (!isDrawing) return;

      const x = e.clientX;
      const y = e.clientY;

      drawChalkStroke(lastX, lastY, x, y);

      lastX = x;
      lastY = y;
      startAnimation();
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    const drawChalkStroke = (x1, y1, x2, y2) => {
      const distance = Math.hypot(x2 - x1, y2 - y1);
      const angle = Math.atan2(y2 - y1, x2 - x1);

      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

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

    const fadeOut = () => {
      if (document.hidden) {
        animId = null;
        return;
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      if (isDrawing) {
        idleFrames = 0;
        animId = requestAnimationFrame(fadeOut);
      } else {
        idleFrames++;
        if (idleFrames < MAX_IDLE_FRAMES) {
          animId = requestAnimationFrame(fadeOut);
        } else {
          // Clear completely and stop RAF to free GPU/CPU
          ctx.clearRect(0, 0, width, height);
          animId = null;
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleVisibilityChange = () => {
      if (document.hidden && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 45,
      }}
      aria-hidden="true"
    />
  );
}

