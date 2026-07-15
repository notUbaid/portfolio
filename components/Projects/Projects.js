"use client";

import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import { projects } from "@/data/content";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <img src="/ship.webp" className="sectionBg" alt="" loading="lazy" decoding="async" />
      <div className="section">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          things i&apos;ve <span style={{ color: "var(--accent)" }}>shipped</span>
        </motion.h2>

        <div className={styles.grid}>
          {projects.items.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
