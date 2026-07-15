"use client";
/* =============================================
   PhysicsCat — Realism Overhaul
   The cat climbs up from behind cards, sits,
   walks, sleeps, gets scared, hides, and 
   re-emerges from the exact same spot.
   ============================================= */

import { useState, useEffect, useRef } from "react";
import styles from "./PhysicsCat.module.css";

// ── Physics Constants ──
const WALK_SPEED = 0.8;
const FLEE_SPEED = 3.5;
const CAT_W      = 50;
const CAT_H      = 40;
const SCARE_R    = 120;
const RESPAWN_MS = 1200;
const MAX_LIFE   = 1800; // ~30s auto-hide

// ── State Enum ──
const S = Object.freeze({
  HIDDEN:        "hidden",
  CLIMBING:      "climbing",
  IDLE:          "idle",
  SITTING:       "sitting",
  WALKING:       "walking",
  SLEEPING:      "sleeping",
  STARTLED:      "startled",
  FLEEING:       "fleeing",
  HIDING:        "hiding",
  HIDDEN_BEHIND: "hidden_behind",
  PEEKING:       "peeking",
  JUMPING:       "jumping",
  RELOCATING:    "relocating",
  HIDING_RELOCATE: "hiding_relocate"
});

// ── Cat Color Palettes ──
const BREEDS = [
  { name: "tuxedo", body: "#333", chest: "#3a3a3a", farLeg: "#2a2a2a", nearLeg: "#383838", paw: "#4a4a4a", tail: "#333", earInner: "#f9a8d4", nose: "#f9a8d4", eyeColor: "#a3e635" },
  { name: "ginger", body: "#c2733a", chest: "#d4884f", farLeg: "#a55e2c", nearLeg: "#cf7e42", paw: "#b8764a", tail: "#c2733a", earInner: "#e8a87c", nose: "#e07a5f", eyeColor: "#facc15" },
  { name: "persian", body: "#d5c8b8", chest: "#e2d8cc", farLeg: "#c4b5a2", nearLeg: "#ddd0c0", paw: "#c8bfb2", tail: "#d5c8b8", earInner: "#f0c4c8", nose: "#e8a0a0", eyeColor: "#7dd3fc" },
  { name: "black", body: "#1c1c1c", chest: "#2a2a2a", farLeg: "#141414", nearLeg: "#222", paw: "#333", tail: "#1c1c1c", earInner: "#c97a8a", nose: "#c97a8a", eyeColor: "#fbbf24" },
];

function gatherPlatforms() {
  const sX = window.scrollX;
  const sY = window.scrollY;
  return Array.from(document.querySelectorAll('[data-cat-target="true"]'))
    .map(el => {
      const r = el.getBoundingClientRect();
      return { l: r.left + sX, r: r.right + sX, t: r.top + sY, w: r.width, el };
    })
    .filter(p => p.w >= CAT_W * 0.2); // allow small targets like text characters
}

function visiblePlatforms(ps) {
  // Never spawn in the first viewport (Hero section)
  const lo = Math.max(window.scrollY + 100, window.innerHeight);
  const hi = window.scrollY + window.innerHeight + 200;
  return ps.filter(p => p.t > lo && p.t < hi);
}

function findJumpTarget(c, allPlats) {
  const reachX = 350;
  const reachY = 250;
  const targets = allPlats.filter(p => {
    if (p.el === c.plat.el) return false;
    let dx = c.dir === 1 ? p.l - (c.x + CAT_W) : c.x - p.r;
    if (dx < -CAT_W || dx > reachX) return false; // allow slight overlap
    const dy = Math.abs(p.t - c.plat.t);
    return dy <= reachY;
  });
  if (targets.length === 0) return null;
  targets.sort((a, b) => {
    const da = Math.abs(a.l - c.x) + Math.abs(a.t - c.plat.t);
    const db = Math.abs(b.l - c.x) + Math.abs(b.t - c.plat.t);
    return da - db;
  });
  return targets[0];
}

const startJump = (c, target) => {
  c.state = S.JUMPING;
  c.t = 0;
  c.jumpTarget = target;
  c.jumpStartX = c.x;
  c.jumpStartY = c.plat.t;
  c.jumpEndX = c.dir === 1 ? target.l : target.r - CAT_W;
  c.jumpEndY = target.t;
  const dist = Math.hypot(c.jumpEndX - c.jumpStartX, c.jumpEndY - c.jumpStartY);
  c.jumpDur = Math.max(30, dist * 0.15); // ~0.15 frames per pixel
};

export default function PhysicsCat() {
  const [frame, setFrame] = useState(null);
  const C = useRef({
    x: 0, state: S.HIDDEN, dir: 1, plat: null,
    t: 0, na: 0, clip: CAT_H + 5, life: 0,
    breed: BREEDS[0],
    jumpTarget: null, jumpStartX: 0, jumpStartY: 0, jumpEndX: 0, jumpEndY: 0, jumpDur: 0, yOverride: null
  });

  const mouse = useRef({ x: -9e3, y: -9e3 });
  const timers = useRef({});
  const rafRef = useRef();
  const prevTs = useRef(0);

  useEffect(() => {
    const onMouse = (e) => mouse.current = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
    window.addEventListener("mousemove", onMouse);

    const clearTimers = () => { Object.values(timers.current).forEach(clearTimeout); timers.current = {}; };

    const isScared = (radius = SCARE_R) => {
      const catY = C.current.yOverride !== null ? C.current.yOverride - CAT_H : (C.current.plat ? C.current.plat.t - CAT_H : 0);
      const dx = mouse.current.x - (C.current.x + CAT_W / 2);
      const dy = mouse.current.y - (catY + CAT_H / 2);
      return dx * dx + dy * dy < radius * radius;
    };

    const spawn = () => {
      clearTimers();
      const all = gatherPlatforms();
      const visible = visiblePlatforms(all);
      if (!visible.length) { timers.current.retry = setTimeout(spawn, 2000); return; }
      const plat = visible[Math.floor(Math.random() * visible.length)];
      const rr = plat.el.getBoundingClientRect();
      plat.l = rr.left + window.scrollX; plat.r = rr.right + window.scrollX;
      plat.t = rr.top + window.scrollY; plat.w = rr.width;

      const c = C.current;
      c.x = plat.l + Math.random() * Math.max(0, plat.w - CAT_W);
      c.state = S.CLIMBING;
      c.plat = plat;
      c.dir = Math.random() > 0.5 ? 1 : -1;
      c.t = 0; c.na = 0; c.life = 0; c.clip = CAT_H + 5; c.yOverride = null;
      c.breed = BREEDS[Math.floor(Math.random() * BREEDS.length)];
    };

    const tick = (now) => {
      if (!prevTs.current) prevTs.current = now;
      const dt = Math.min((now - prevTs.current) / 16.67, 3);
      prevTs.current = now;

      const c = C.current;
      c.t += dt; c.life += dt;

      if (c.plat?.el && document.body.contains(c.plat.el) && c.state !== S.JUMPING) {
        const rr = c.plat.el.getBoundingClientRect();
        c.plat.l = rr.left + window.scrollX; c.plat.r = rr.right + window.scrollX;
        c.plat.t = rr.top + window.scrollY; c.plat.w = rr.width;
      } else if (c.plat && c.state !== S.HIDDEN && c.state !== S.JUMPING) {
        c.state = S.HIDDEN;
        timers.current.rs = setTimeout(spawn, RESPAWN_MS);
      }

      if (c.life > MAX_LIFE && [S.IDLE, S.SITTING, S.WALKING, S.SLEEPING].includes(c.state)) {
        c.state = S.HIDING; c.t = 0;
      }

      switch (c.state) {
        case S.HIDDEN: break;
        case S.CLIMBING:
          c.clip -= 0.8 * dt;
          if (c.clip <= 0) { c.clip = 0; c.state = S.IDLE; c.t = 0; c.na = 30 + Math.random() * 60; }
          break;
        case S.IDLE:
          if (isScared()) { c.state = S.STARTLED; c.t = 0; break; }
          if (c.t > c.na) {
            c.t = 0; const r = Math.random();
            if (r < 0.5) { c.state = S.SITTING; c.na = 600 + Math.random() * 400; }
            else if (r < 0.7) { c.state = S.SLEEPING; c.na = 900 + Math.random() * 600; }
            else if (r < 0.85) {
              c.state = S.WALKING; c.na = 120 + Math.random() * 150;
              const mid = c.plat.l + c.plat.w / 2;
              if (c.x < mid - 20) c.dir = 1; else if (c.x > mid + 20) c.dir = -1; else c.dir = Math.random() > 0.5 ? 1 : -1;
            } else {
              c.state = S.RELOCATING;
              const leftDist = c.x - c.plat.l; const rightDist = c.plat.r - (c.x + CAT_W);
              c.dir = rightDist < leftDist ? 1 : -1;
            }
          }
          break;
        case S.SITTING:
          if (isScared(SCARE_R * 0.85)) { c.state = S.STARTLED; c.t = 0; break; }
          if (c.t > c.na) { c.state = S.IDLE; c.t = 0; c.na = 30 + Math.random() * 60; }
          break;
        case S.WALKING:
        case S.RELOCATING:
          if (isScared()) { c.state = S.STARTLED; c.t = 0; break; }
          c.x += WALK_SPEED * c.dir * dt;
          if (c.x < c.plat.l || c.x + CAT_W > c.plat.r) {
            const target = findJumpTarget(c, gatherPlatforms());
            if (target && Math.random() > 0.1) {
              startJump(c, target);
            } else {
              c.x = c.dir === 1 ? c.plat.r - CAT_W : c.plat.l; c.dir *= -1;
              c.state = S.IDLE; c.t = 0; c.na = 30;
            }
          } else if (c.state === S.WALKING && c.t > c.na) {
            c.state = S.IDLE; c.t = 0; c.na = 30 + Math.random() * 60;
          }
          break;
        case S.JUMPING:
          const prog = Math.min(c.t / c.jumpDur, 1);
          c.x = c.jumpStartX + (c.jumpEndX - c.jumpStartX) * prog;
          const jumpHeight = 40 + Math.abs(c.jumpEndX - c.jumpStartX) * 0.25;
          c.yOverride = c.jumpStartY + (c.jumpEndY - c.jumpStartY) * prog - Math.sin(prog * Math.PI) * jumpHeight;
          if (prog >= 1) {
            c.plat = c.jumpTarget; c.x = c.jumpEndX; c.state = S.IDLE; c.t = 0; c.na = 30; c.yOverride = null;
          }
          break;
        case S.SLEEPING:
          if (isScared(SCARE_R * 0.7)) { c.state = S.STARTLED; c.t = 0; break; }
          if (c.t > c.na) { c.state = S.SITTING; c.t = 0; c.na = 60 + Math.random() * 100; }
          break;
        case S.STARTLED:
          if (c.t > 12) { c.state = S.FLEEING; c.t = 0; c.dir = mouse.current.x < c.x + CAT_W / 2 ? 1 : -1; }
          break;
        case S.FLEEING:
          c.x += FLEE_SPEED * c.dir * dt;
          if (c.x < c.plat.l || c.x + CAT_W > c.plat.r) {
            const target = findJumpTarget(c, gatherPlatforms());
            if (target) startJump(c, target); else { c.state = S.HIDING; c.t = 0; }
          }
          if (c.t > 45 && c.state !== S.JUMPING) { c.state = S.HIDING; c.t = 0; }
          break;
        case S.HIDING:
          c.clip += 3 * dt;
          if (c.clip >= CAT_H + 5) { c.clip = CAT_H + 5; c.state = S.HIDDEN_BEHIND; c.t = 0; }
          break;
        case S.HIDDEN_BEHIND:
          if (!isScared(SCARE_R + 80)) {
            if (c.t > 60) { c.state = S.PEEKING; c.t = 0; c.life = 0; }
          } else { c.t = 0; }
          if (c.life > MAX_LIFE * 2) { c.state = S.HIDDEN; timers.current.rs = setTimeout(spawn, RESPAWN_MS); }
          break;
        case S.PEEKING:
          // Pop head up (clip = CAT_H - 18)
          if (c.clip > CAT_H - 18) { c.clip -= 1.5 * dt; }
          else { c.clip = CAT_H - 18; }
          if (c.t > 120) { c.state = S.CLIMBING; c.t = 0; }
          break;
      }

      setFrame(
        c.state === S.HIDDEN || !c.plat
          ? null
          : { 
              x: c.x, 
              y: c.state === S.JUMPING ? c.yOverride - CAT_H : c.plat.t - CAT_H + c.clip, 
              s: c.state, 
              d: c.dir, 
              cl: c.clip, 
              breed: c.breed 
            }
      );

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (C.current.state === S.HIDDEN && !timers.current.rs && !timers.current.retry) {
        timers.current.retry = setTimeout(spawn, 800);
      }
    };
    window.addEventListener("scroll", onScroll);

    timers.current.init = setTimeout(spawn, 1500);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimers();
    };
  }, []);

  if (!frame) return null;

  const { x, y, s, d, cl, breed } = frame;

  // We only clip when not completely hidden behind (CSS handles opacity 0 for hidden_behind)
  const isClipping = cl > 0 && s !== S.HIDDEN_BEHIND;

  return (
    <div
      className={`${styles.cat} ${styles[s] || ""}`}
      style={{
        left: x,
        top: y,
        transform: d > 0 ? "scaleX(-1)" : "none",
        ...(isClipping ? { clipPath: `inset(0 0 ${cl}px 0)` } : {}),
      }}
      aria-hidden="true"
    >
      <CatSVG breed={breed} />
    </div>
  );
}

// ══════════════════════════════════════════════
// CatSVG — Cute kitten with breed colors
// ══════════════════════════════════════════════

function CatSVG({ breed }) {
  const b = breed || BREEDS[0];
  
  return (
    <svg viewBox="0 0 100 76" className={styles.catSvg}>
      {/* ── Tail ── */}
      <path
        className={styles.tail}
        d="M 78,48 Q 90,40 92,24"
        stroke={b.tail}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Back legs (far side) ── */}
      <rect className={styles.backLegFar}  x="63" y="58" width="7" height="12" rx="3" fill={b.farLeg} />
      <rect className={styles.frontLegFar} x="35" y="58" width="7" height="12" rx="3" fill={b.farLeg} />

      {/* ── Body ── */}
      <ellipse className={styles.body} cx="55" cy="52" rx="24" ry="15" fill={b.body} />

      {/* ── Chest ── */}
      <ellipse className={styles.chest} cx="42" cy="54" rx="10" ry="11" fill={b.chest} />

      {/* ── Near legs ── */}
      <rect className={styles.frontLegNear} x="38" y="58" width="8" height="15" rx="3.5" fill={b.nearLeg} />
      <rect className={styles.backLegNear}  x="66" y="58" width="8" height="15" rx="3.5" fill={b.nearLeg} />

      {/* ── Paw tips (attached to near legs) ── */}
      {/* We add them to the SVG without animation classes, or maybe we don't need distinct paw tip colors if it complicates it. Actually, paw tips make it cute. But let's attach them inside a group with the leg so they don't detach when the leg rotates! */}
      <g className={styles.frontLegNear}>
         <ellipse cx="42" cy="73" rx="4" ry="2.2" fill={b.paw} />
      </g>
      <g className={styles.backLegNear}>
         <ellipse cx="70" cy="73" rx="4" ry="2.2" fill={b.paw} />
      </g>

      {/* ── Head Group ── */}
      <g className={styles.head}>
        {/* Ears */}
        <polygon points="14,24 17,4 28,20" fill={b.body} />
        {/* Solid color for inner ear, no opacity to avoid weird texture blending */}
        <polygon points="16,22 18,8 26,20" fill={b.earInner} />
        
        <polygon points="28,20 39,4 42,24" fill={b.body} />
        <polygon points="30,20 38,8 40,22" fill={b.earInner} />

        {/* Head Base */}
        <circle cx="28" cy="34" r="17" fill={b.body} />

        {/* Open Eyes */}
        <g className={styles.openEyes}>
          <ellipse cx="22" cy="32" rx="3.5" ry="5" fill={b.eyeColor} />
          <ellipse cx="22" cy="32" rx="1.8" ry="4.5" fill="#111" />
          <circle  cx="20.5" cy="30.5" r="1" fill="#fff" opacity="0.6" />
          <ellipse cx="34" cy="32" rx="3.5" ry="5" fill={b.eyeColor} />
          <ellipse cx="34" cy="32" rx="1.5" ry="4.5" fill="#111" />
          <circle  cx="32.5" cy="30.5" r="1" fill="#fff" opacity="0.6" />
        </g>

        {/* Sleep Eyes */}
        <g className={styles.sleepEyes}>
          <path d="M 18.5,33 Q 22,36 25.5,33" stroke={b.eyeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 30.5,33 Q 34,36 37.5,33" stroke={b.eyeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* Wide Eyes */}
        <g className={styles.wideEyes}>
          <circle cx="22" cy="32" r="5.5" fill={b.eyeColor} />
          <circle cx="22" cy="32" r="3"   fill="#111" />
          <circle cx="20.5" cy="30" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="34" cy="32" r="5.5" fill={b.eyeColor} />
          <circle cx="34" cy="32" r="3"   fill="#111" />
          <circle cx="32.5" cy="30" r="1.5" fill="#fff" opacity="0.8" />
        </g>

        {/* Nose */}
        <path d="M 27,38 L 28,36.5 L 29,38 Z" fill={b.nose} />

        {/* Mouth */}
        <path d="M 28,38 Q 26.5,40 25.5,39.5" stroke="#555" strokeWidth="0.8" fill="none" />
        <path d="M 28,38 Q 29.5,40 30.5,39.5" stroke="#555" strokeWidth="0.8" fill="none" />

        {/* Whiskers */}
        <g className={styles.whiskers}>
          <line x1="17" y1="36" x2="5"  y2="34" stroke="#888" strokeWidth="0.7" />
          <line x1="17" y1="37" x2="6"  y2="37" stroke="#888" strokeWidth="0.7" />
          <line x1="17" y1="38" x2="4"  y2="39" stroke="#888" strokeWidth="0.7" />
          <line x1="39" y1="36" x2="51" y2="34" stroke="#888" strokeWidth="0.7" />
          <line x1="39" y1="37" x2="50" y2="37" stroke="#888" strokeWidth="0.7" />
          <line x1="39" y1="38" x2="52" y2="39" stroke="#888" strokeWidth="0.7" />
        </g>
      </g>

      {/* ── Sleeping Z's ── */}
      <g className={styles.sleepZs}>
        <text x="5" y="15" fill="#888" fontSize="10" fontFamily="sans-serif" className={styles.z1}>z</text>
        <text x="15" y="5" fill="#888" fontSize="14" fontFamily="sans-serif" className={styles.z2}>Z</text>
      </g>
    </svg>
  );
}
