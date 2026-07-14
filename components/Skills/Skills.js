"use client";

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
          {skills.heading}
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
                  {cat.items.map((item) => (
                    <motion.span
                      key={item}
                      className={styles.skillItem}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
