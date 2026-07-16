"use client";
import React, { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import styles from './AdaptiveNav.module.css'
import { useIsMobile } from "@/hooks/useIsMobile"

const navItems = [
  { label: 'Home', id: 'hero', href: '#hero' },
  { label: 'About', id: 'about', href: '#about' },
  { label: 'Projects', id: 'projects', href: '#projects' },
  { label: 'Client Work', id: 'client-work', href: '#client-work' },
  { label: 'Highlights', id: 'achievements', href: '#achievements' },
  { label: 'Experience', id: 'experience', href: '#experience' },
  { label: 'Skills', id: 'skills', href: '#skills' },
  { label: 'Contact', id: 'footer', href: '#footer' },
]

export const AdaptiveNav = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [clickedSection, setClickedSection] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const hoverTimeoutRef = useRef(null)
  const isMobile = useIsMobile()

  // Approximate width for 8 items is ~680px, collapsed width is 110px
  const pillWidth = useSpring(110, { stiffness: 220, damping: 25, mass: 1 })
  const pillHeight = useSpring(42, { stiffness: 220, damping: 25, mass: 1 })

  const visibilityRatios = useRef({});

  // Active section tracking via intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        visibilityRatios.current[entry.target.id] = entry.intersectionRatio;
      });

      let bestMatch = null;
      let maxRatio = 0;
      
      Object.entries(visibilityRatios.current).forEach(([id, ratio]) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          bestMatch = id;
        }
      });
      
      // Fallback: if we somehow don't have a max ratio > 0, we shouldn't change
      if (bestMatch && maxRatio > 0 && !hovering) {
        setActiveSection(bestMatch);
      }
    }, { 
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] 
    });

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hovering]);

  useEffect(() => {
    if (hovering) {
      setExpanded(true)
      pillWidth.set(isMobile ? 140 : 680)
      pillHeight.set(isMobile ? 320 : 42)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false)
        pillWidth.set(110) 
        pillHeight.set(42)
      }, 300) // Faster collapse
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [hovering, pillWidth, pillHeight, isMobile])

  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => setHovering(false)

  const handleSectionClick = (sectionId, href) => {
    setActiveSection(sectionId)
    setClickedSection(sectionId)
    setTimeout(() => {
      setClickedSection(null)
      setHovering(false)
    }, 200)
    
    window.dispatchEvent(new CustomEvent('nav-scroll'));
    
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const activeItem = navItems.find(item => item.id === activeSection) || navItems[0];

  return (
    <div className={styles.navWrapper}>
      <motion.nav
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.navContainer}
        style={{
          width: pillWidth,
          height: pillHeight,
          background: 'rgba(25, 25, 25, 0.4)', // Darker, transparent
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          borderRadius: '9999px',
        }}
      >
        <div className={styles.itemsContainer}>
          {!expanded && (
            <div className={styles.collapsedFlex}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{
                    duration: 0.35,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  style={{
                    fontSize: '13px', 
                    fontWeight: 500,
                    color: 'var(--fg)',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activeItem.label}
                </motion.span>
              </AnimatePresence>
            </div>
          )}

          {expanded && (
            <div className={styles.expandedFlex}>
              {navItems.map((item, index) => {
                const isActive = item.id === activeSection
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ 
                      delay: index * 0.03, // Faster stagger
                      duration: 0.2,
                      ease: 'easeOut'
                    }}
                    onClick={() => handleSectionClick(item.id, item.href)}
                    className={styles.navButton}
                    style={{
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      color: clickedSection === item.id ? 'var(--accent)' : (isActive ? 'var(--fg)' : 'var(--fg-muted)'),
                      letterSpacing: '0.3px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && clickedSection !== item.id) e.currentTarget.style.color = 'var(--fg)'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive && clickedSection !== item.id) e.currentTarget.style.color = 'var(--fg-muted)'
                    }}
                  >
                    {item.label}
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  )
}
