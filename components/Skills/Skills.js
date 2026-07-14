"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";
import { skills } from "@/data/content";

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
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
  const [isFallen, setIsFallen] = useState(false);
  const [dropY, setDropY] = useState(0);
  const pillRef = useRef(null);

  const handleClick = () => {
    if (isFallen) return;
    
    if (pillRef.current) {
      const rect = pillRef.current.getBoundingClientRect();
      const distance = document.documentElement.scrollHeight - window.scrollY - rect.bottom;
      setDropY(distance - 10 - Math.random() * 20); 
    }
    setIsFallen(true);
  };

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
        animate={
          isFallen 
            ? { 
                y: [0, dropY, dropY - 80, dropY, dropY - 25, dropY], 
                rotate: [
                  0, 
                  (i % 2 === 0 ? 1 : -1) * 45, 
                  (i % 2 === 0 ? 1 : -1) * 15, 
                  (i % 2 === 0 ? 1 : -1) * 30, 
                  (i % 2 === 0 ? 1 : -1) * 20, 
                  (i % 2 === 0 ? 1 : -1) * 25
                ],
                x: [
                  0, 
                  (i % 2 === 0 ? 1 : -1) * 30, 
                  (i % 2 === 0 ? 1 : -1) * 40, 
                  (i % 2 === 0 ? 1 : -1) * 50, 
                  (i % 2 === 0 ? 1 : -1) * 55, 
                  (i % 2 === 0 ? 1 : -1) * 60
                ]
              } 
            : { y: 0, rotate: 0, x: 0 }
        }
        transition={
          isFallen
            ? { 
                duration: 2.8, 
                times: [0, 0.6, 0.8, 0.9, 0.95, 1], 
                ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn"] 
              }
            : { duration: 0.3 }
        }
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
