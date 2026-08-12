"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CommandPalette.module.css";
import { playClickSound, toggleAudioMute, getAudioMuted } from "@/lib/audio";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useKonamiCode();

  const actions = [
    { id: "hero", label: "Jump to Hero Section", category: "Navigation", icon: "🚀", action: () => scrollTo("#hero") },
    { id: "about", label: "Jump to About Section", category: "Navigation", icon: "👤", action: () => scrollTo("#about") },
    { id: "projects", label: "Jump to Projects Section", category: "Navigation", icon: "⚡", action: () => scrollTo("#projects") },
    { id: "experience", label: "Jump to Experience Section", category: "Navigation", icon: "💼", action: () => scrollTo("#experience") },
    { id: "skills", label: "Jump to Skills Section", category: "Navigation", icon: "🛠️", action: () => scrollTo("#skills") },
    { id: "achievements", label: "Jump to Achievements", category: "Navigation", icon: "🏆", action: () => scrollTo("#achievements") },
    { id: "github", label: "Open GitHub Profile", category: "Social", icon: "🐙", action: () => window.open("https://github.com/notUbaid", "_blank") },
    { id: "linkedin", label: "Open LinkedIn Profile", category: "Social", icon: "🔗", action: () => window.open("https://linkedin.com/in/notubaid", "_blank") },
    { id: "email", label: "Copy Contact Email", category: "Action", icon: "📧", action: () => copyEmail() },
    { id: "physics", label: "Unleash All Physics Pills", category: "Fun", icon: "💣", action: () => dropAllPills() },
    { id: "audio", label: "Toggle UI Sound FX", category: "Preferences", icon: "🔊", action: () => toggleAudioMute() },
  ];

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("notubaid@gmail.com");
    if (typeof window !== "undefined") {
      alert("Email copied to clipboard!");
    }
  };

  const dropAllPills = () => {
    const pills = document.querySelectorAll("[data-text]:not(.fallen)");
    pills.forEach((p) => {
      if (p instanceof HTMLElement && !p.classList.contains("fallen")) {
        p.click();
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        playClickSound();
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      playClickSound();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-cmd-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-cmd-palette", handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => {
        setSearch("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isOpen]);

  const handleKeyDownList = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      playClickSound();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      playClickSound();
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                className={styles.input}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownList}
              />
              <span className={styles.escBadge}>ESC</span>
            </div>

            <div className={styles.list}>
              {filtered.length === 0 ? (
                <div style={{ padding: "16px", textAlign: "center", color: "#666" }}>
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${styles.item} ${index === selectedIndex ? styles.selected : ""}`}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className={styles.itemLeft}>
                      <span className={styles.itemIcon}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className={styles.itemBadge}>{item.category}</span>
                  </div>
                ))
              )}
            </div>

            <div className={styles.footer}>
              <span>Navigate with arrows, press Enter to select</span>
              <div className={styles.footerKeys}>
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
