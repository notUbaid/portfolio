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

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const nightQuotes = [
      `It's ${timeStr}. Nothing good gets deployed after midnight. You should know this.`,
      `It's ${timeStr}. If you're reading this, either your servers are down or your life is.`,
      `Why are you looking at my portfolio at ${timeStr}? Go to sleep. I'm not fixing your bugs.`,
      `It's ${timeStr}. The only things awake are you, me, and that one memory leak you ignored.`,
      `If you hire me at ${timeStr}, just know I bill double for insomnia.`
    ];

    const earlyMorningQuotes = [
      `It's ${timeStr}. You're either a tech lead with a cold plunge routine or a junior in a crisis.`,
      `I respect the ${timeStr} hustle, but please tell me you've slept.`,
      `Waking up at ${timeStr} to look at portfolios is a cry for help.`,
      `It's ${timeStr}. The sun isn't even up. My code barely is.`,
      `If you're making hiring decisions at ${timeStr}, please drink some water first.`
    ];

    const morningQuotes = [
      `Ah, ${timeStr}. The optimal time to write code you'll hate by 3 PM.`,
      `Good morning. I hope your coffee is stronger than your production environment.`,
      `It's ${timeStr}. Time to pretend we know what Agile means.`,
      `Morning. Let's look at my projects before the daily standup drains our will to live.`,
      `It's ${timeStr}. You have exactly 8 hours to figure out why the pipeline is failing.`
    ];

    const afternoonQuotes = [
      `It's ${timeStr}. You should probably be working instead of looking at my portfolio. I won't tell.`,
      `Post-lunch productivity slump? Welcome to my portfolio.`,
      `It's ${timeStr}. Statistically, this is when most people break production.`,
      `Looking at my portfolio at ${timeStr}? I appreciate the procrastination.`,
      `It's ${timeStr}. You have exactly 3 hours to pretend you got things done today.`
    ];

    const eveningQuotes = [
      `It's ${timeStr}. Production is frozen. Put the keyboard down.`,
      `Working late? Let's just blame it on DNS and go home.`,
      `It's ${timeStr}. The optimal hour for questioning your career choices.`,
      `If you're still working at ${timeStr}, hire me so I can do it faster for you.`,
      `Evening. The perfect time to deploy on a Friday and immediately regret it.`
    ];

    if (hour >= 0 && hour < 4) {
      setTagline(getRandom(nightQuotes));
    } else if (hour >= 4 && hour < 7) {
      setTagline(getRandom(earlyMorningQuotes));
    } else if (hour >= 7 && hour < 12) {
      setTagline(getRandom(morningQuotes));
    } else if (hour >= 12 && hour < 17) {
      setTagline(getRandom(afternoonQuotes));
    } else if (hour >= 17 && hour < 24) {
      setTagline(getRandom(eveningQuotes));
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
          data-cat-target="true"
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
