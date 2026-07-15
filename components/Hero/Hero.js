"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { hero } from "@/data/content";
import { usePhysicsPill } from "@/lib/physics";

function FloatingShape({ delay, size, x, y, color }) {
  return (
    <motion.div
      className={styles.floatingShape}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function NameChar({ char, i }) {
  const [isSketched, setIsSketched] = useState(false);
  
  if (char === " ") {
    return (
      <motion.span
        className={styles.nameSpace}
        data-cat-target="true"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.4 + i * 0.04,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {"\u00A0"}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`${styles.nameChar} ${isSketched ? styles.sketched : ""}`}
      data-char={char}
      data-cat-target="true"
      onMouseEnter={() => setIsSketched(prev => !prev)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.4 + i * 0.04,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <span className={styles.innerChar}>{char}</span>
    </motion.span>
  );
}

export default function Hero() {
  const [tagline, setTagline] = useState(hero.tagline);

  useEffect(() => {
    const hour = new Date().getHours();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (hour >= 0 && hour < 4) {
      setTagline(`It's ${timeStr}. If you're a recruiter, please go to sleep. If you're an engineer, what broke in production?`);
    } else if (hour >= 4 && hour < 7) {
      setTagline(`You're either horribly jetlagged, or you haven't slept since yesterday. Either way, welcome.`);
    } else if (hour >= 7 && hour < 12) {
      setTagline(`Another day of converting caffeine into obscure error messages.`);
    } else if (hour >= 12 && hour < 17) {
      setTagline(`You should probably be doing real work right now instead of looking at my portfolio. I won't tell if you don't.`);
    } else if (hour >= 17 && hour < 24) {
      setTagline(`Production is frozen for the day. Perfect time to rethink your hiring decisions.`);
    }
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Subtle geometric shapes floating in background */}
      <div className={styles.shapes} aria-hidden="true">
        <div className={styles.memeBackground} />
        <FloatingShape delay={0} size={300} x="75%" y="10%" color="var(--accent-dim)" />
        <FloatingShape delay={5} size={200} x="5%" y="60%" color="var(--accent-2-dim)" />
        <FloatingShape delay={10} size={150} x="85%" y="70%" color="var(--accent-dim)" />
      </div>

      <div className={styles.container}>
        <motion.p
          className={styles.prelude}
          data-cat-target="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          hi, i&apos;m
        </motion.p>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {hero.name.split("").map((char, i) => (
            <NameChar key={i} char={char} i={i} />
          ))}
          <motion.span
            className={styles.cursor}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            _
          </motion.span>
        </motion.h1>

        <motion.div
          className={styles.rolesWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {hero.roles.map((role, i) => (
            <RolePill key={role} role={role} i={i} />
          ))}
        </motion.div>

        <motion.p
          className={styles.tagline}
          data-cat-target="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {tagline}
        </motion.p>

        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <span className={styles.scrollText}>scroll down, it gets better</span>
          <motion.span
            className={styles.scrollArrow}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

const roleWittyTexts = {
  "full-stack developer": "not without chatgpt",
  "ui designer": "lorem ipsum reader",
  "club president": "volunteered labour",
  "competitive hackathon participant": "goes for free food and memories"
};

function RolePill({ role, i }) {
  const { pillRef, isFallen, handleClick } = usePhysicsPill(styles.fallen);

  return (
    <div className={styles.rolePillContainer}>
      <span 
        className={styles.wittyText}
        style={{ 
          opacity: isFallen ? 1 : 0, 
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "0.2s" // Wait slightly before showing
        }}
      >
        {roleWittyTexts[role.toLowerCase()] || "just pretending"}
      </span>
      
      <motion.span
        ref={pillRef}
        className={`${styles.rolePill} ${isFallen ? styles.fallen : ''}`}
        data-text={role}
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isFallen ? undefined : { opacity: 1, scale: 1, y: 0, rotate: 0, x: 0 }}
        transition={isFallen ? undefined : { duration: 0.3, delay: 1.0 + i * 0.1 }}
        style={{ 
          cursor: isFallen ? 'default' : 'pointer', 
          zIndex: isFallen ? 50 : 2 
        }}
      >
        {role}
      </motion.span>
    </div>
  );
}
