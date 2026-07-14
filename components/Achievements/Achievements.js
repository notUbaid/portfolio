"use client";

import { motion } from "framer-motion";
import { Medal, Award, Trophy } from "lucide-react";
import styles from "./Achievements.module.css";
import { achievements } from "@/data/content";

const iconMap = {
  Medal: <Medal size={48} className={styles.icon} strokeWidth={1.5} />,
  Award: <Award size={48} className={styles.icon} strokeWidth={1.5} />,
  Trophy: <Trophy size={48} className={styles.icon} strokeWidth={1.5} />,
};

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
          {achievements.heading}
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
            <motion.div
              key={item.event}
              className={styles.trophy}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className={styles.iconWrapper}>
                {iconMap[item.icon] || <Award size={48} className={styles.icon} strokeWidth={1.5} />}
              </div>
              <div className={styles.trophyContent}>
                <h3 className={styles.trophyTitle}>{item.title}</h3>
                <p className={styles.trophyEvent}>{item.event}</p>
                <p className={styles.trophyOrg}>{item.org}</p>
                {item.project && (
                  <p className={styles.trophyProject}>Project: {item.project}</p>
                )}
              </div>
            </motion.div>
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

        {achievements.extras && achievements.extras.length > 0 && (
          <div className={styles.extras}>
            {achievements.extras.map((extra, i) => (
              <motion.p
                key={i}
                className={styles.extra}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
              >
                → {extra}
              </motion.p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
