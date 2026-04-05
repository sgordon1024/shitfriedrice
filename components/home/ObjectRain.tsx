/**
 * ObjectRain — Continuously raining objects with real bounce physics
 *
 * Objects fall from above with gravity, bounce off the bottom with
 * varying weight/bounciness, and pile up. They never stop spawning.
 * Uses requestAnimationFrame for smooth 60fps physics.
 *
 * Each object is a real <img> element (not canvas) so they render
 * crisply at any resolution. Physics runs in a ref, DOM updates
 * happen via direct style manipulation (no React re-renders).
 */

"use client";

import { useRef, useEffect, useCallback } from "react";
import { asset } from "@/lib/prefix";

// All available decor images
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
  "moth1.png",
  "cube1.png",
  "key1.png",
  "cloud1.png",
  "eyes1.png",
  "purple1.png", "purple2.png",
  "pink1.png", "pink2.png",
  "orange1.png", "orange2.png",
  "silver1.png", "silver2.png",
  "blue1.png", "blue2.png",
  "figurine1.png", "figurine2.png",
  "red1.png", "red2.png",
  "green1.png", "green2.png",
];

interface PhysicsObject {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;      // rotational velocity
  size: number;
  mass: number;     // affects gravity and bounciness
  bounciness: number;
  friction: number;
  settled: boolean; // true when object has stopped bouncing
  settledFrames: number;
}

// Physics constants
const GRAVITY = 0.35;
const SPAWN_INTERVAL_MS = 250; // new object every 250ms
const MAX_OBJECTS = 200;       // cap so we don't destroy the browser

export default function ObjectRain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<PhysicsObject[]>([]);
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const floorYRef = useRef<number>(0);

  const spawnObject = useCallback(() => {
    const container = containerRef.current;
    if (!container || objectsRef.current.length >= MAX_OBJECTS) return;

    const containerW = container.offsetWidth;
    floorYRef.current = container.offsetHeight;

    // Random decor image
    const srcName = DECOR_SRCS[Math.floor(Math.random() * DECOR_SRCS.length)];
    const src = asset(`/images/decor/${srcName}`);

    // Random properties — varying weight and speed
    const size = 35 + Math.random() * 50;
    const mass = 0.5 + Math.random() * 2; // light to heavy
    const bounciness = 0.3 + Math.random() * 0.5; // 0.3 to 0.8

    // Create the img element
    const el = document.createElement("img");
    el.src = src;
    el.alt = "";
    el.draggable = false;
    el.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      object-fit: contain;
      pointer-events: none;
      will-change: transform;
      opacity: 0.75;
      filter: saturate(1.3) brightness(1.1);
    `;
    container.appendChild(el);

    const obj: PhysicsObject = {
      el,
      x: Math.random() * (containerW - size),
      y: -size - Math.random() * 200, // start above the viewport
      vx: -1 + Math.random() * 2,     // slight horizontal drift
      vy: 1 + mass * 1.5,             // heavier = falls faster initially
      rotation: Math.random() * 360,
      vr: -4 + Math.random() * 8,     // spin speed
      size,
      mass,
      bounciness,
      friction: 0.97,
      settled: false,
      settledFrames: 0,
    };

    objectsRef.current.push(obj);
  }, []);

  const tick = useCallback((timestamp: number) => {
    const container = containerRef.current;
    if (!container) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const floorY = container.offsetHeight;
    const containerW = container.offsetWidth;
    floorYRef.current = floorY;

    // Spawn new objects on interval
    if (timestamp - lastSpawnRef.current > SPAWN_INTERVAL_MS) {
      spawnObject();
      lastSpawnRef.current = timestamp;
    }

    const objects = objectsRef.current;

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      if (obj.settled) continue;

      // Apply gravity (heavier objects accelerate slightly faster)
      obj.vy += GRAVITY * (0.8 + obj.mass * 0.2);

      // Apply velocity
      obj.x += obj.vx;
      obj.y += obj.vy;
      obj.rotation += obj.vr;

      // Floor collision — BOUNCE
      const groundLevel = floorY - obj.size;
      if (obj.y >= groundLevel) {
        obj.y = groundLevel;
        // Bounce: reverse velocity, reduce by bounciness factor
        obj.vy = -Math.abs(obj.vy) * obj.bounciness;
        obj.vx *= 0.8; // friction on bounce
        obj.vr *= 0.7; // slow rotation on bounce

        // If bounce is tiny, settle
        if (Math.abs(obj.vy) < 1.5) {
          obj.vy = 0;
          obj.vx = 0;
          obj.vr = 0;
          obj.settledFrames++;
          if (obj.settledFrames > 10) {
            obj.settled = true;
          }
        }
      }

      // Wall collisions — gentle bounce off sides
      if (obj.x <= 0) {
        obj.x = 0;
        obj.vx = Math.abs(obj.vx) * 0.5;
      } else if (obj.x >= containerW - obj.size) {
        obj.x = containerW - obj.size;
        obj.vx = -Math.abs(obj.vx) * 0.5;
      }

      // Horizontal friction while in air
      obj.vx *= obj.friction;

      // Update DOM element position
      obj.el.style.transform = `translate(${obj.x}px, ${obj.y}px) rotate(${obj.rotation}deg)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [spawnObject]);

  // Start the physics loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      // Cleanup DOM elements
      objectsRef.current.forEach((obj) => obj.el.remove());
      objectsRef.current = [];
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
