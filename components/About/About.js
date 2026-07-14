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
          the <span style={{ color: "var(--accent)" }}>lore</span>
        </motion.h2>

        <div className={styles.aboutLayout}>
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
          
          <motion.div 
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <img 
              src="/lore.jpeg" 
              alt="Ubaid Khan" 
              className={styles.loreImage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
