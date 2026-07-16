"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./ContainerScroll.module.css";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inner}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className={styles.header}
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, translate, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className={styles.card}
    >
      <div className={styles.cardInner}>
        {children}
      </div>
    </motion.div>
  );
};
