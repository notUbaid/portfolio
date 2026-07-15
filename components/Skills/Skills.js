"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";
import { skills } from "@/data/content";
import { usePhysicsPill } from "@/lib/physics";

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <img src="/actually.jpg" className="sectionBg" alt="" loading="lazy" decoding="async" />
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          things i can <span style={{ color: "var(--accent)" }}>actually</span> do
        </motion.h2>

        <div className={styles.categories}>
          {skills.categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                className={styles.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <h3 className={styles.categoryLabel}>{cat.label}</h3>
                <div className={styles.categoryItems}>
                  {cat.items.map((item, j) => (
                    <SkillPill key={item} item={item} i={j} />
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

function SkillPill({ item, i }) {
  const { pillRef, isFallen, handleClick } = usePhysicsPill(styles.fallen);

  return (
    <div className={styles.skillPillContainer}>
      <span 
        className={styles.wittyText}
        style={{ 
          opacity: isFallen ? 1 : 0, 
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "0.2s"
        }}
      >
        
      </span>
      
      <motion.span
        ref={pillRef}
        className={`${styles.skillItem} ${isFallen ? styles.fallen : ''}`}
        data-text={item}
        onClick={handleClick}
        animate={isFallen ? undefined : { y: 0, rotate: 0, x: 0 }}
        transition={isFallen ? undefined : { duration: 0.3 }}
        style={{ 
          cursor: isFallen ? 'default' : 'pointer', 
          zIndex: isFallen ? 50 : 2 
        }}
      >
        {item}
      </motion.span>
    </div>
  );
}
