/**
 * ObjectRain — Endless raining objects with bounce physics + mouse interaction
 *
 * Objects fall, bounce, pile up on each other (not just the floor),
 * and never stop spawning. The mouse pushes objects away like a force field.
 * Objects slowly pile to the top if you wait long enough.
 *
 * Also handles the random cursor — every hover gets a different decor image.
 */

"use client";

import { useRef, useEffect, useCallback } from "react";
import { asset } from "@/lib/prefix";

const DECOR_SRCS = [
  "gem1.png", "gem2.png", "gem3.png",
  "shell1.png", "shell2.png", "shell3.png",
  "star1.png", "star2.png", "star3.png",
  "iridescent1.png", "iridescent2.png",
  "butterfly1.png", "butterfly2.png",
  "pearl1.png", "pearl2.png",
  "flower1.png", "flower2.png",
  "spiral1.png", "spiral2.png",
  "moon1.png", "moon2.png",
  "skull1.png", "skull2.png",
  "heart1.png", "heart2.png",
  "gold1.png", "gold2.png",
  "crystal1.png", "crystal2.png",
  "moth1.png", "cube1.png", "key1.png",
  "cloud1.png", "eyes1.png",
  "purple1.png", "purple2.png",
  "pink1.png", "pink2.png",
  "orange1.png", "orange2.png",
  "silver1.png", "silver2.png",
  "blue1.png", "blue2.png",
  "figurine1.png", "figurine2.png",
  "red1.png", "red2.png",
  "green1.png", "green2.png",
];

// Shuffled copy for cursor cycling — no repeats until all used
let cursorPool: string[] = [];
function getNextCursorSrc(): string {
  if (cursorPool.length === 0) {
    cursorPool = [...DECOR_SRCS].sort(() => Math.random() - 0.5);
  }
  return cursorPool.pop()!;
}

interface PhysObj {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  mass: number;
  bounce: number;
  settled: boolean;
  settleCount: number;
}

const GRAVITY = 0.28;
const MOUSE_RADIUS = 120;
const MOUSE_FORCE = 8;
const SPAWN_MS = 600;        // slower spawn so pile builds gradually
const PILE_CHECK_EVERY = 30; // frames between pile-height checks

export default function ObjectRain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const objsRef = useRef<PhysObj[]>([]);
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999 });
  const frameRef = useRef(0);
  // Track settled heights in columns for piling
  const columnsRef = useRef<number[]>([]);
  const NUM_COLS = 40;

  // Reset column heights
  const resetColumns = useCallback((floorY: number) => {
    columnsRef.current = new Array(NUM_COLS).fill(floorY);
  }, []);

  const spawnObject = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;

    const cW = c.offsetWidth;
    const srcName = DECOR_SRCS[Math.floor(Math.random() * DECOR_SRCS.length)];
    const src = asset(`/images/decor/${srcName}`);

    const size = 30 + Math.random() * 45;
    const mass = 0.4 + Math.random() * 2.2;
    const bounce = 0.25 + Math.random() * 0.55;

    const el = document.createElement("img");
    el.src = src;
    el.alt = "";
    el.draggable = false;
    el.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      object-fit:contain;
      pointer-events:none;
      will-change:transform;
      opacity:0.85;
      filter:saturate(1.4) brightness(1.15);
      top:0;left:0;
    `;
    c.appendChild(el);

    objsRef.current.push({
      el,
      x: Math.random() * (cW - size),
      y: -size - Math.random() * 300,
      vx: -1.5 + Math.random() * 3,
      vy: 0.5 + mass * 1.2,
      rot: Math.random() * 360,
      vr: -5 + Math.random() * 10,
      size,
      mass,
      bounce,
      settled: false,
      settleCount: 0,
    });
  }, []);

  const tick = useCallback((ts: number) => {
    const c = containerRef.current;
    if (!c) { rafRef.current = requestAnimationFrame(tick); return; }

    const floorY = c.offsetHeight;
    const cW = c.offsetWidth;
    frameRef.current++;

    // Initialize columns if needed
    if (columnsRef.current.length === 0) resetColumns(floorY);

    // Spawn
    if (ts - lastSpawnRef.current > SPAWN_MS) {
      spawnObject();
      lastSpawnRef.current = ts;
    }

    // Rebuild pile height map from settled objects periodically
    if (frameRef.current % PILE_CHECK_EVERY === 0) {
      const cols = new Array(NUM_COLS).fill(floorY);
      for (const o of objsRef.current) {
        if (!o.settled) continue;
        const colStart = Math.floor((o.x / cW) * NUM_COLS);
        const colEnd = Math.min(NUM_COLS - 1, Math.floor(((o.x + o.size) / cW) * NUM_COLS));
        for (let ci = colStart; ci <= colEnd; ci++) {
          if (ci >= 0 && ci < NUM_COLS) {
            cols[ci] = Math.min(cols[ci], o.y);
          }
        }
      }
      columnsRef.current = cols;
    }

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const objs = objsRef.current;

    for (let i = 0; i < objs.length; i++) {
      const o = objs[i];

      // Mouse interaction — push settled AND active objects
      const ocx = o.x + o.size / 2;
      const ocy = o.y + o.size / 2;
      const dx = ocx - mx;
      const dy = ocy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 1) {
        const force = (MOUSE_FORCE * (1 - dist / MOUSE_RADIUS)) / o.mass;
        const nx = dx / dist;
        const ny = dy / dist;
        o.vx += nx * force;
        o.vy += ny * force;
        o.vr += (Math.random() - 0.5) * force * 3;
        if (o.settled) {
          o.settled = false;
          o.settleCount = 0;
        }
      }

      if (o.settled) continue;

      // Gravity
      o.vy += GRAVITY * (0.7 + o.mass * 0.25);

      // Apply velocity
      o.x += o.vx;
      o.y += o.vy;
      o.rot += o.vr;

      // Find the ground level for this object (pile surface)
      const colIdx = Math.floor(((o.x + o.size / 2) / cW) * NUM_COLS);
      const clampedCol = Math.max(0, Math.min(NUM_COLS - 1, colIdx));
      const groundHere = columnsRef.current[clampedCol] - o.size;
      const effectiveGround = Math.min(floorY - o.size, groundHere);

      // Floor/pile collision
      if (o.y >= effectiveGround) {
        o.y = effectiveGround;
        o.vy = -Math.abs(o.vy) * o.bounce;
        o.vx *= 0.75;
        o.vr *= 0.6;

        if (Math.abs(o.vy) < 1.2) {
          o.vy = 0;
          o.vx *= 0.5;
          o.vr = 0;
          o.settleCount++;
          if (o.settleCount > 8) {
            o.settled = true;
          }
        }
      }

      // Walls
      if (o.x <= 0) { o.x = 0; o.vx = Math.abs(o.vx) * 0.4; }
      else if (o.x >= cW - o.size) { o.x = cW - o.size; o.vx = -Math.abs(o.vx) * 0.4; }

      // Air friction
      o.vx *= 0.985;

      // Update DOM
      o.el.style.transform = `translate(${o.x}px,${o.y}px) rotate(${o.rot}deg)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [spawnObject, resetColumns]);

  // Mouse tracking
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const handleMove = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleLeave = () => {
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
    };

    // Listen on the parent section (which has pointer-events)
    const section = c.parentElement;
    if (section) {
      section.addEventListener("mousemove", handleMove);
      section.addEventListener("mouseleave", handleLeave);
    }
    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMove);
        section.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, []);

  // Random cursor on hover — changes every time you hover ANY interactive element
  useEffect(() => {
    const handleHover = () => {
      const src = asset(`/images/decor/${getNextCursorSrc()}`);
      document.documentElement.style.cursor = `url("${src}") 12 12, auto`;
    };

    // Attach to all interactive elements
    const attachCursorListeners = () => {
      const els = document.querySelectorAll("a, button, [role='button'], input, select, textarea");
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
      });
      return els;
    };

    // Initial attach + re-attach on DOM changes (for dynamically added elements)
    let els = attachCursorListeners();
    const observer = new MutationObserver(() => {
      // Detach old
      els.forEach((el) => el.removeEventListener("mouseenter", handleHover));
      // Re-attach
      els = attachCursorListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      els.forEach((el) => el.removeEventListener("mouseenter", handleHover));
      observer.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  // Start physics
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      objsRef.current.forEach((o) => o.el.remove());
      objsRef.current = [];
    };
  }, [tick]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block"
      aria-hidden="true"
    />
  );
}
