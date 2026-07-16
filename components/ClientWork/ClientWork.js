"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./ClientWork.module.css";
import { clientWork } from "@/data/content";

export default function ClientWork() {
  return (
    <section className={styles.clientWork} id="client-work">
      <img src="/paid.jpg" className="sectionBg" alt="" loading="lazy" decoding="async" />
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          stuff clients <span style={{ color: "var(--accent)" }}>paid</span> me for
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {clientWork.subtitle}
        </motion.p>

        <div className={styles.grid}>
          {clientWork.items.map((item, i) => (
            <ClientCard key={item.name} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useMouseReveal } from "@/hooks/useMouseReveal";

function ClientCard({ item, i }) {
  const { ref, isHovered } = useMouseReveal();

  const renderContent = (isBlackboard = false) => (
    <>
      <div className={styles.cardTop}>
        <span className={styles.clientLabel}>Client Work</span>
        <ExternalLink size={16} className={styles.linkIcon} />
      </div>
      <h3 className={styles.cardTitle}>{item.name}</h3>
      <p className={styles.cardTagline}>
        {isBlackboard && item.wittyTagline ? item.wittyTagline : item.tagline}
      </p>
      <p className={styles.cardDescription}>
        {isBlackboard && item.wittyDescription
          ? item.wittyDescription
          : item.description}
      </p>
      <div className={styles.cardTech}>
        {item.tech.map((t) => (
          <span key={t} className={styles.techTag}>
            {t}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <div className={styles.cardWrapper}>
      <motion.a
        href={item.live}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
        data-cat-target="true"
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.12 }}
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className={styles.normalLayer}>{renderContent(false)}</div>
        <div
          className={`${styles.blackboardLayer} ${isHovered ? styles.revealed : ''}`}
          aria-hidden="true"
        >
          {renderContent(true)}
        </div>
      </motion.a>
    </div>
  );
}
