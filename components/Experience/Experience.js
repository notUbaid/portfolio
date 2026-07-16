"use client";

import { motion } from "framer-motion";
import styles from "./Experience.module.css";
import { experience } from "@/data/content";

export default function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <img src="/resume.jpg" className="sectionBg" alt="" loading="lazy" decoding="async" />
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          the <span style={{ color: "var(--accent)" }}>résumé</span> larp
        </motion.h2>

        <div className={styles.timeline}>
          {experience.items.map((item, i) => (
            <ExperienceEntry key={item.role + item.org} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useMouseReveal } from "@/hooks/useMouseReveal";

function ExperienceEntry({ item, i }) {
  const { ref, isHovered } = useMouseReveal();

  const renderContent = (isBlackboard = false) => (
    <>
      <div className={styles.entryHeader}>
        <h3 className={styles.entryRole}>{item.role}</h3>
        <span className={styles.entryDuration}>{item.duration}</span>
      </div>
      <p className={styles.entryOrg}>{item.org}</p>
      {item.note && <p className={styles.entryNote}>{item.note}</p>}
      
      {isBlackboard && item.wittyDescription ? (
        <p style={{ fontFamily: "var(--font-sketch-body)", fontSize: "0.95rem", color: "#e0e4e1", lineHeight: "1.6", marginTop: "12px" }}>
          {item.wittyDescription}
        </p>
      ) : (
        <ul className={styles.entryDetails}>
          {item.details.map((detail, j) => (
            <li key={j} className={styles.entryDetail}>
              {detail}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <motion.div
      className={styles.entry}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: i * 0.15 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className={styles.entryDot} />
      <div className={styles.entryContentWrapper} ref={ref} data-cat-target="true">
        <div className={styles.normalLayer}>{renderContent(false)}</div>
        <div
          className={`${styles.blackboardLayer} ${isHovered ? styles.revealed : ''}`}
          aria-hidden="true"
        >
          {renderContent(true)}
        </div>
      </div>
    </motion.div>
  );
}
