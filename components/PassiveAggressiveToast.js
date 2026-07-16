"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PassiveAggressiveToast.module.css";

export default function PassiveAggressiveToast() {
  const [toasts, setToasts] = useState([]);
  
  // Trackers
  const hasTriggeredIdle = useRef(false);
  const hasTriggeredSpeed = useRef(false);
  const idleTimeout = useRef(null);
  
  // Speed tracker state
  const scrollStartTime = useRef(0);
  const scrollStartY = useRef(0);
  
  const isNavScroll = useRef(false);
  const navScrollTimeout = useRef(null);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    // === Idle Tracker ===
    const resetIdleTimer = () => {
      if (hasTriggeredIdle.current) return;
      
      clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        if (!hasTriggeredIdle.current) {
          addToast("You still there? Should I put on some elevator music?");
          hasTriggeredIdle.current = true;
        }
      }, 40000); // 40 seconds
    };

    // Initialize
    resetIdleTimer();

    // === Speed Tracker ===
    const handleScroll = () => {
      resetIdleTimer();
      
      if (hasTriggeredSpeed.current || isNavScroll.current) return;

      const currentY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // If they are at the top, reset start time
      if (currentY < 100) {
        scrollStartTime.current = Date.now();
        scrollStartY.current = currentY;
      }
      
      // If they hit the bottom
      if (currentY > maxScroll - 200) {
        const timeElapsed = Date.now() - scrollStartTime.current;
        
        // If they scrolled from top to bottom in under 10 seconds
        if (scrollStartY.current < 100 && timeElapsed > 0 && timeElapsed < 10000) {
          const seconds = (timeElapsed / 1000).toFixed(1);
          addToast(`Whoa, slow down. I spent weeks writing that code and you just scrolled past it in ${seconds} seconds.`);
          hasTriggeredSpeed.current = true;
        }
      }
    };

    const handleInteraction = () => {
      resetIdleTimer();
    };

    const handleNavScroll = () => {
      isNavScroll.current = true;
      scrollStartY.current = 1000; // invalidate speed tracker
      
      clearTimeout(navScrollTimeout.current);
      navScrollTimeout.current = setTimeout(() => {
        isNavScroll.current = false;
      }, 3000);
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("nav-scroll", handleNavScroll);

    return () => {
      clearTimeout(idleTimeout.current);
      clearTimeout(navScrollTimeout.current);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("nav-scroll", handleNavScroll);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastWrapper} aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={styles.toast}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <button
              className={styles.closeButton}
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              ×
            </button>
            <p>{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
