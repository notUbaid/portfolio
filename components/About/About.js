"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";
import { about } from "@/data/content";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {about.heading}
        </motion.h2>

        <div className={styles.content}>
          {about.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className={styles.paragraph}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
