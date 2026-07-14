"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { hero } from "@/data/content";

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

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Subtle geometric shapes floating in background */}
      <div className={styles.shapes} aria-hidden="true">
        <FloatingShape delay={0} size={300} x="75%" y="10%" color="var(--accent-dim)" />
        <FloatingShape delay={5} size={200} x="5%" y="60%" color="var(--accent-2-dim)" />
        <FloatingShape delay={10} size={150} x="85%" y="70%" color="var(--accent-dim)" />
      </div>

      <div className={styles.container}>
        <motion.p
          className={styles.prelude}
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
            <motion.span
              key={i}
              className={char === " " ? styles.nameSpace : styles.nameChar}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + i * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
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
            <motion.span
              key={role}
              className={styles.rolePill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
              whileHover={{ borderColor: "var(--fg-subtle)" }}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {hero.tagline}
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
