"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./ClientWork.module.css";
import { clientWork } from "@/data/content";

export default function ClientWork() {
  return (
    <section className={styles.clientWork} id="client-work">
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {clientWork.heading}
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
            <motion.a
              key={item.name}
              href={item.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.clientLabel}>Client Work</span>
                <ExternalLink size={16} className={styles.linkIcon} />
              </div>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardTagline}>{item.tagline}</p>
              <p className={styles.cardDescription}>{item.description}</p>
              <div className={styles.cardTech}>
                {item.tech.map((t) => (
                  <span key={t} className={styles.techTag}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
