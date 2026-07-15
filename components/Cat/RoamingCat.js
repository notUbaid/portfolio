"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./RoamingCat.module.css";

const SPEED = 2.5; // px per frame
const EVADE_DISTANCE = 100; // px
const IDLE_TIME_MAX = 4000;
const SLEEP_CHANCE = 0.4;

export default function RoamingCat() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [facingRight, setFacingRight] = useState(true);
  const [state, setState] = useState("idle"); // idle, walking, sleeping
  
  const stateRef = useRef("idle");
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const idleTimerRef = useRef(null);

  useEffect(() => {
    // Initial spawn position (middle top)
    posRef.current = { x: window.innerWidth / 2, y: window.scrollY - 50 };
    setPos(posRef.current);

    const handleMouseMove = (e) => {
      mouseRef.current = { 
        x: e.clientX + window.scrollX, 
        y: e.clientY + window.scrollY 
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;

    const pickNewTarget = () => {
      const targets = Array.from(document.querySelectorAll('[data-cat-target="true"]'));
      
      if (Math.random() < 0.1 || targets.length === 0) {
         // Floor target
         targetRef.current = {
           x: Math.random() * (window.innerWidth - 40),
           y: window.scrollY + window.innerHeight - 40,
           type: 'floor'
         };
         return;
      }

      const randomTarget = targets[Math.floor(Math.random() * targets.length)];
      const rect = randomTarget.getBoundingClientRect();
      
      // Try to pick a spot on the top edge
      targetRef.current = {
        x: rect.left + window.scrollX + Math.random() * (rect.width - 40),
        y: rect.top + window.scrollY - 40, // 40 is cat height
        type: 'element',
        element: randomTarget
      };
    };

    const update = () => {
      let { x, y } = posRef.current;
      const mouse = mouseRef.current;
      
      // Evade mouse
      const dxMouse = mouse.x - (x + 20);
      const dyMouse = mouse.y - (y + 20);
      const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
      
      if (distMouse < EVADE_DISTANCE) {
         stateRef.current = "walking";
         if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
         
         targetRef.current = {
           x: x - dxMouse * 2,
           y: y - dyMouse * 2, // run away
           type: 'flee'
         };
         // Keep within document bounds horizontally
         targetRef.current.x = Math.max(0, Math.min(document.documentElement.scrollWidth - 40, targetRef.current.x));
      }

      // If resting on an element, keep updating target to stick to it if window resizes
      if ((stateRef.current === "idle" || stateRef.current === "sleeping") && targetRef.current?.type === 'element') {
         const rect = targetRef.current.element.getBoundingClientRect();
         // If element scrolled or moved, stick to it (only y matters for sticking usually, or x too if layout shifts)
         // But to prevent jitter, only update if it moved significantly
         const expectedY = rect.top + window.scrollY - 40;
         if (Math.abs(y - expectedY) > 5) {
            y = expectedY; // teleport to stick
            posRef.current.y = y;
         }
      }

      if (stateRef.current === "walking" && targetRef.current) {
        const tx = targetRef.current.x;
        const ty = targetRef.current.y;
        
        const dx = tx - x;
        const dy = ty - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < SPEED) {
          // Reached target
          x = tx;
          y = ty;
          
          if (targetRef.current.type !== 'flee') {
            if (Math.random() < SLEEP_CHANCE) {
              stateRef.current = "sleeping";
            } else {
              stateRef.current = "idle";
            }
            
            idleTimerRef.current = setTimeout(() => {
              if (stateRef.current === "idle" || stateRef.current === "sleeping") {
                 stateRef.current = "walking";
                 pickNewTarget();
              }
            }, Math.random() * IDLE_TIME_MAX + 2000);
          } else {
            // Finished fleeing, find a new target
            pickNewTarget();
          }
        } else {
          // Move
          x += (dx / dist) * SPEED;
          y += (dy / dist) * SPEED;
          
          if (dx > 0) setFacingRight(true);
          else if (dx < 0) setFacingRight(false);
        }
      } else if (stateRef.current === "idle" && !targetRef.current) {
         pickNewTarget();
         stateRef.current = "walking";
      }

      posRef.current = { x, y };
      setPos({ x, y });
      setState(stateRef.current);
      
      animationFrame = requestAnimationFrame(update);
    };

    // Start
    pickNewTarget();
    stateRef.current = "walking";
    animationFrame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <div 
      className={`${styles.catContainer} ${styles[state]}`}
      style={{ left: pos.x, top: pos.y, position: 'absolute' }}
      onMouseEnter={() => {
         if (stateRef.current === "sleeping") {
           stateRef.current = "idle";
         }
      }}
    >
      <CatSVG facingRight={facingRight} />
    </div>
  );
}

const CatSVG = ({ facingRight }) => (
  <svg 
    width="40" height="40" viewBox="0 0 40 40" 
    style={{ transform: facingRight ? 'scaleX(-1)' : 'none', transition: 'transform 0.2s', overflow: 'visible' }}
  >
    <path className={styles.tail} d="M 30 25 Q 38 25 38 15" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="10" y="20" width="20" height="15" rx="7" fill="var(--accent)" />
    <circle className={styles.head} cx="12" cy="18" r="8" fill="var(--accent)" />
    <polygon className={styles.head} points="6,14 8,8 14,12" fill="var(--accent)" />
    <polygon className={styles.head} points="12,12 16,6 18,12" fill="var(--accent)" />
    <g className={`${styles.head} ${styles.eyes}`}>
      <circle cx="8" cy="18" r="1.5" fill="#1a1a1a" />
      <circle cx="14" cy="18" r="1.5" fill="#1a1a1a" />
    </g>
    <g className={`${styles.head} ${styles.sleepEyes}`}>
      <path d="M 6 18 Q 8 20 10 18" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 12 18 Q 14 20 16 18" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);
