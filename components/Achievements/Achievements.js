"use client";

import { motion } from "framer-motion";
import styles from "./Achievements.module.css";
import { achievements } from "@/data/content";

export default function Achievements() {
  return (
    <section className={styles.achievements} id="achievements">
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          the <span style={{ color: "var(--accent)" }}>trophy</span> case
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {achievements.subtitle}
        </motion.p>

        <div className={styles.trophies}>
          {achievements.items.map((item, i) => (
            <TrophyCard key={item.event || item.title} item={item} i={i} />
          ))}
        </div>

        <motion.p
          className={styles.footnote}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {achievements.footnote}
        </motion.p>
        
        <div className={styles.extras}>
          {achievements.extras.map((extra, i) => (
            <motion.p
              key={i}
              className={styles.extra}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
            >
              • {extra}
            </motion.p>
          ))}
        </div>
      </div>
      {/* Force hot reload for content.js */}
    </section>
  );
}

import { useMouseReveal } from "@/hooks/useMouseReveal";

function TrophyCard({ item, i }) {
  const { ref } = useMouseReveal();

  const content = (
    <div className={styles.trophyContent}>
      <h3 className={styles.trophyTitle}>
        {item.title.split('\n').map((line, idx) => (
          <span key={idx} className={idx === 1 ? styles.normalText : ''}>
            {line}
          </span>
        ))}
      </h3>
      {item.event && (
        <p 
          className={styles.trophyEvent}
          style={item.dimEvent ? { color: "var(--fg-muted)", fontWeight: "normal", fontStyle: "italic", fontSize: "0.9rem" } : {}}
        >
          {item.event}
        </p>
      )}
      <p className={styles.trophyOrg}>{item.org}</p>
      {item.project && (
        <p className={styles.trophyProject}>Project: {item.project}</p>
      )}
    </div>
  );

  return (
    <motion.div
      className={styles.trophy}
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: i * 0.12 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className={styles.normalLayer}>{content}</div>
      <div
        className={styles.blackboardLayer}
        aria-hidden="true"
      >
        {content}
      </div>
    </motion.div>
  );
}

