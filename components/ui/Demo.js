"use client";
import React from "react";
import { ContainerScroll } from "./ContainerScroll";
import Image from "next/image";
import styles from "./ContainerScroll.module.css";

export function HeroScrollDemo() {
  return (
    <div className={styles.demoContainer}>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className={styles.title}>
              Unleash the power of <br />
              <span className={styles.titleHighlight}>
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3840&auto=format&fit=crop"
          alt="hero"
          height={720}
          width={1400}
          className={styles.demoImage}
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
