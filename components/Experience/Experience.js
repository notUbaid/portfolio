"use client";

import { motion } from "framer-motion";
import styles from "./Experience.module.css";
import { experience } from "@/data/content";

export default function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {experience.heading}
        </motion.h2>

        <div className={styles.timeline}>
          {experience.items.map((item, i) => (
            <motion.div
              key={`${item.role}-${item.org}`}
              className={styles.entry}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className={styles.entryDot} />
              <div className={styles.entryContent}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryRole}>{item.role}</h3>
                  <span className={styles.entryDuration}>{item.duration}</span>
                </div>
                <p className={styles.entryOrg}>{item.org}</p>
                {item.note && (
                  <p className={styles.entryNote}>{item.note}</p>
                )}
                <ul className={styles.entryDetails}>
                  {item.details.map((detail, j) => (
                    <li key={j} className={styles.entryDetail}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
