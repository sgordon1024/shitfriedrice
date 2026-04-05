/**
 * CorgiRunner — Chrome dino-style arcade game starring Squish
 *
 * Squish runs through Lydia's studio jumping over sauce packets,
 * lava lamps, resin puddles, and flying tortillas. Spacebar or
 * tap to jump. Score increments over time. Difficulty ramps up.
 *
 * Entirely self-contained: canvas rendering, game loop, physics,
 * collision detection, sound effects — no external game libraries.
 */

"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { playBoingSmall, playBoingUp, playBoingDown } from "@/lib/sounds";

// --- Game constants ---
const CANVAS_W = 800;
const CANVAS_H = 300;
const GROUND_Y = 245;
const GRAVITY_MIN = 0.45;   // floaty at the start — long, forgiving jumps
const GRAVITY_MAX = 0.65;   // tightens up as speed increases
const JUMP_VEL = -13.5;
const CORGI_W = 62;
const CORGI_H = 38;
const CORGI_X = 80;

// Obstacle types with spawn weights
const OBSTACLE_TYPES = [
  { type: "sauce", w: 22, h: 28, groundLevel: true, weight: 30 },
  { type: "lamp", w: 26, h: 52, groundLevel: true, weight: 20 },
  { type: "puddle", w: 65, h: 14, groundLevel: true, weight: 15 },
  { type: "tortilla", w: 38, h: 10, groundLevel: false, weight: 15 },
  { type: "cheese", w: 28, h: 24, groundLevel: true, weight: 20 },
];

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: string;
  color: string;
}

interface GameState {
  status: "idle" | "running" | "gameover";
  corgiY: number;
  corgiVY: number;
  isJumping: boolean;
  legFrame: number;
  obstacles: Obstacle[];
  score: number;
  highScore: number;
  frameCount: number;
  speed: number;
  lastSpawnFrame: number;
  nextSpawnGap: number;
}

interface CorgiRunnerProps {
  onGameComplete?: () => void;
}

export default function CorgiRunner({ onGameComplete }: CorgiRunnerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState>(createInitialState());
  const rafRef = useRef<number>(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<"idle" | "running" | "gameover">("idle");
  const hasCompletedRef = useRef(false);

  function createInitialState(): GameState {
    let hs = 0;
    try { hs = parseInt(localStorage.getItem("squish-high-score") || "0", 10) || 0; } catch { /* noop */ }
    return {
      status: "idle",
      corgiY: GROUND_Y,
      corgiVY: 0,
      isJumping: false,
      legFrame: 0,
      obstacles: [],
      score: 0,
      highScore: hs,
      frameCount: 0,
      speed: 3,
      lastSpawnFrame: 0,
      nextSpawnGap: 140,
    };
  }

  // Pick a random obstacle type based on weights
  function pickObstacleType() {
    const total = OBSTACLE_TYPES.reduce((s, t) => s + t.weight, 0);
    let r = Math.random() * total;
    for (const t of OBSTACLE_TYPES) {
      r -= t.weight;
      if (r <= 0) return t;
    }
    return OBSTACLE_TYPES[0];
  }

  // Pick a color for an obstacle
  function pickColor(type: string): string {
    const colors: Record<string, string[]> = {
      sauce: ["#c5371a", "#e8630a", "#FFD700", "#ff2d8a"],
      lamp: ["#4db8d4", "#7ec84c", "#ff2d8a"],
      puddle: ["#c490f0"],
      tortilla: ["#D2B48C"],
      cheese: ["#FFD700"],
    };
    const opts = colors[type] || ["#c5371a"];
    return opts[Math.floor(Math.random() * opts.length)];
  }

  function spawnObstacle(gs: GameState) {
    const t = pickObstacleType();
    const y = t.groundLevel ? GROUND_Y - t.h : GROUND_Y - 55;
    gs.obstacles.push({
      x: CANVAS_W + 20,
      y,
      w: t.w,
      h: t.h,
      type: t.type,
      color: pickColor(t.type),
    });
  }

  // --- Drawing functions ---
  function drawCorgi(ctx: CanvasRenderingContext2D, gs: GameState) {
    const x = CORGI_X;
    const y = gs.corgiY - CORGI_H;
    const dead = gs.status === "gameover";

    ctx.save();
    if (dead) {
      // Squish flat — pancake corgi
      ctx.translate(x + CORGI_W / 2, GROUND_Y);
      ctx.scale(1.4, 0.25);
      ctx.translate(-(x + CORGI_W / 2), -GROUND_Y);
    }

    // --- BIG ROUND BODY (she's a chonky girl) ---
    // Main body — wide oval
    ctx.fillStyle = "#c8862a";
    ctx.beginPath();
    ctx.ellipse(x + CORGI_W / 2, y + CORGI_H / 2 + 2, CORGI_W / 2, CORGI_H / 2 + 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Belly highlight — she's ROUND
    ctx.fillStyle = "#d49a3a";
    ctx.beginPath();
    ctx.ellipse(x + CORGI_W / 2 - 3, y + CORGI_H / 2 + 5, CORGI_W / 2 - 8, CORGI_H / 2 - 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // White chest/belly
    ctx.fillStyle = "#f5f0e8";
    ctx.beginPath();
    ctx.ellipse(x + 12, y + CORGI_H * 0.65, 10, CORGI_H * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- BIG ROUND HEAD ---
    ctx.fillStyle = "#c8862a";
    ctx.beginPath();
    ctx.arc(x + CORGI_W - 4, y + 4, 16, 0, Math.PI * 2);
    ctx.fill();

    // White face blaze
    ctx.fillStyle = "#f5f0e8";
    ctx.beginPath();
    ctx.ellipse(x + CORGI_W - 1, y + 7, 7, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- BIG SATELLITE DISH EARS ---
    ctx.fillStyle = "#b07020";
    // Left ear — big and pointy
    ctx.beginPath();
    ctx.moveTo(x + CORGI_W - 20, y - 3);
    ctx.lineTo(x + CORGI_W - 14, y - 24);
    ctx.lineTo(x + CORGI_W - 5, y - 3);
    ctx.fill();
    // Left ear inner
    ctx.fillStyle = "#e8c090";
    ctx.beginPath();
    ctx.moveTo(x + CORGI_W - 18, y - 3);
    ctx.lineTo(x + CORGI_W - 14, y - 18);
    ctx.lineTo(x + CORGI_W - 8, y - 3);
    ctx.fill();

    // Right ear — big and pointy
    ctx.fillStyle = "#b07020";
    ctx.beginPath();
    ctx.moveTo(x + CORGI_W + 1, y - 3);
    ctx.lineTo(x + CORGI_W + 8, y - 24);
    ctx.lineTo(x + CORGI_W + 15, y - 3);
    ctx.fill();
    // Right ear inner
    ctx.fillStyle = "#e8c090";
    ctx.beginPath();
    ctx.moveTo(x + CORGI_W + 3, y - 3);
    ctx.lineTo(x + CORGI_W + 8, y - 18);
    ctx.lineTo(x + CORGI_W + 13, y - 3);
    ctx.fill();

    // --- Eyes (big and sweet) ---
    // Eye whites
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x + CORGI_W - 1, y + 2, 4, 0, Math.PI * 2);
    ctx.fill();
    // Pupil
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(x + CORGI_W, y + 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Eye shine
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x + CORGI_W + 1, y + 1, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // --- Nose ---
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.ellipse(x + CORGI_W + 10, y + 8, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Tongue (when running, not jumping) ---
    if (!dead && !gs.isJumping && gs.legFrame % 2 === 0) {
      ctx.fillStyle = "#ff7b9c";
      ctx.beginPath();
      ctx.ellipse(x + CORGI_W + 10, y + 14, 2.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- STUBBY LITTLE LEGS (comically short) ---
    if (!dead) {
      ctx.strokeStyle = "#b07020";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      const legLen = 8; // very short — she's a corgi

      if (gs.isJumping) {
        // Tucked — all four legs pulled up
        ctx.beginPath();
        ctx.moveTo(x + 10, y + CORGI_H);
        ctx.lineTo(x + 15, y + CORGI_H + 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 20, y + CORGI_H);
        ctx.lineTo(x + 24, y + CORGI_H + 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + CORGI_W - 18, y + CORGI_H);
        ctx.lineTo(x + CORGI_W - 14, y + CORGI_H + 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + CORGI_W - 10, y + CORGI_H);
        ctx.lineTo(x + CORGI_W - 6, y + CORGI_H + 2);
        ctx.stroke();
      } else {
        // Running — tiny legs pumping frantically
        const alt = gs.legFrame % 2 === 0;
        // Back left
        ctx.beginPath();
        ctx.moveTo(x + 10, y + CORGI_H);
        ctx.lineTo(x + (alt ? 5 : 16), y + CORGI_H + legLen);
        ctx.stroke();
        // Back right
        ctx.beginPath();
        ctx.moveTo(x + 20, y + CORGI_H);
        ctx.lineTo(x + (alt ? 26 : 14), y + CORGI_H + legLen);
        ctx.stroke();
        // Front left
        ctx.beginPath();
        ctx.moveTo(x + CORGI_W - 18, y + CORGI_H);
        ctx.lineTo(x + CORGI_W - (alt ? 24 : 14), y + CORGI_H + legLen);
        ctx.stroke();
        // Front right
        ctx.beginPath();
        ctx.moveTo(x + CORGI_W - 10, y + CORGI_H);
        ctx.lineTo(x + CORGI_W - (alt ? 4 : 16), y + CORGI_H + legLen);
        ctx.stroke();

        // Little paws — round dots at the end of each leg
        ctx.fillStyle = "#f5f0e8";
        const pawY = y + CORGI_H + legLen;
        ctx.beginPath();
        ctx.arc(x + (alt ? 5 : 16), pawY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + (alt ? 26 : 14), pawY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + CORGI_W - (alt ? 24 : 14), pawY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + CORGI_W - (alt ? 4 : 16), pawY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- Little nub wiggle (no tail — just a nub!) ---
    if (!dead) {
      const nubWiggle = Math.sin(gs.frameCount * 0.5) * 4;
      ctx.fillStyle = "#c8862a";
      ctx.beginPath();
      ctx.arc(x + 2, y + CORGI_H * 0.3 + nubWiggle, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
    ctx.fillStyle = obs.color;
    switch (obs.type) {
      case "sauce":
        // Rounded rectangle sauce packet
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 4);
        ctx.fill();
        // Small white label area
        ctx.fillStyle = "#f5f0e8";
        ctx.fillRect(obs.x + 3, obs.y + 6, obs.w - 6, 8);
        break;

      case "lamp":
        // Lava lamp shape — tapered bottle
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.w * 0.3, obs.y);
        ctx.lineTo(obs.x + obs.w * 0.7, obs.y);
        ctx.lineTo(obs.x + obs.w * 0.8, obs.y + obs.h * 0.3);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h * 0.8);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
        ctx.lineTo(obs.x, obs.y + obs.h);
        ctx.lineTo(obs.x, obs.y + obs.h * 0.8);
        ctx.lineTo(obs.x + obs.w * 0.2, obs.y + obs.h * 0.3);
        ctx.closePath();
        ctx.fill();
        // Blob inside
        ctx.fillStyle = obs.color + "80";
        ctx.beginPath();
        ctx.ellipse(obs.x + obs.w / 2, obs.y + obs.h * 0.55, obs.w * 0.25, obs.h * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "puddle":
        // Flat iridescent puddle
        const grad = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.w, obs.y + obs.h);
        grad.addColorStop(0, "#ff6ec4");
        grad.addColorStop(0.5, "#7873f5");
        grad.addColorStop(1, "#4db8d4");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(obs.x + obs.w / 2, obs.y + obs.h / 2, obs.w / 2, obs.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "tortilla":
        // Flat flying tortilla
        ctx.beginPath();
        ctx.ellipse(obs.x + obs.w / 2, obs.y + obs.h / 2, obs.w / 2, obs.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Char spots
        ctx.fillStyle = "#8B7355";
        ctx.beginPath();
        ctx.arc(obs.x + obs.w * 0.3, obs.y + obs.h * 0.4, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(obs.x + obs.w * 0.6, obs.y + obs.h * 0.6, 1.5, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "cheese":
        // Cheese wedge — the ultimate temptation
        // Main wedge shape (triangle)
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.h);               // bottom left
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h);        // bottom right
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h * 0.3);  // top right
        ctx.lineTo(obs.x + obs.w * 0.15, obs.y);         // top point
        ctx.closePath();
        ctx.fill();
        // Darker side face
        ctx.fillStyle = "#e6c200";
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.h);
        ctx.lineTo(obs.x + obs.w * 0.15, obs.y);
        ctx.lineTo(obs.x + obs.w * 0.15, obs.y + obs.h * 0.15);
        ctx.lineTo(obs.x, obs.y + obs.h);
        ctx.closePath();
        ctx.fill();
        // Cheese holes
        ctx.fillStyle = "#e6b800";
        ctx.beginPath();
        ctx.arc(obs.x + obs.w * 0.5, obs.y + obs.h * 0.55, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(obs.x + obs.w * 0.7, obs.y + obs.h * 0.75, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(obs.x + obs.w * 0.35, obs.y + obs.h * 0.8, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Outline for definition
        ctx.strokeStyle = "#cc9e00";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.h);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h * 0.3);
        ctx.lineTo(obs.x + obs.w * 0.15, obs.y);
        ctx.closePath();
        ctx.stroke();
        break;
    }
  }

  function drawGround(ctx: CanvasRenderingContext2D, gs: GameState) {
    ctx.strokeStyle = "#c5371a40";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 15);
    ctx.lineTo(CANVAS_W, GROUND_Y + 15);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ground texture dots
    ctx.fillStyle = "#c5371a20";
    for (let i = 0; i < 30; i++) {
      const gx = ((i * 37 + gs.frameCount * 2) % (CANVAS_W + 20)) - 10;
      ctx.beginPath();
      ctx.arc(gx, GROUND_Y + 20 + (i % 3) * 4, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawUI(ctx: CanvasRenderingContext2D, gs: GameState) {
    // Score
    ctx.fillStyle = "#2a2118";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`Score: ${gs.score}`, CANVAS_W - 15, 25);

    if (gs.highScore > 0) {
      ctx.fillStyle = "#2a211860";
      ctx.font = "12px monospace";
      ctx.fillText(`Best: ${gs.highScore}`, CANVAS_W - 15, 42);
    }

    if (gs.status === "idle") {
      ctx.fillStyle = "#2a2118";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Press SPACE or TAP to begin", CANVAS_W / 2, CANVAS_H / 2 - 20);
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#2a211880";
      ctx.fillText("Help Squish save the studio!", CANVAS_W / 2, CANVAS_H / 2 + 10);
    }

    if (gs.status === "gameover") {
      // Semi-transparent overlay
      ctx.fillStyle = "rgba(245, 240, 232, 0.7)";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.fillStyle = "#c5371a";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2 - 25);

      ctx.fillStyle = "#2a2118";
      ctx.font = "bold 18px monospace";
      ctx.fillText(`Score: ${gs.score}`, CANVAS_W / 2, CANVAS_H / 2 + 10);

      if (gs.score >= gs.highScore && gs.score > 0) {
        ctx.fillStyle = "#ff2d8a";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText("New High Score!", CANVAS_W / 2, CANVAS_H / 2 + 32);
      }

      ctx.fillStyle = "#2a211880";
      ctx.font = "14px sans-serif";
      ctx.fillText("SPACE / TAP to retry", CANVAS_W / 2, CANVAS_H / 2 + 55);
    }
  }

  // --- Game loop ---
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gs = gameRef.current;

    // Clear
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background
    ctx.fillStyle = "#f5f0e8";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    if (gs.status === "running") {
      gs.frameCount++;

      // Ramp difficulty — starts slow, picks up after ~10 seconds
      gs.speed = 3 + gs.frameCount * 0.0008;

      // Physics — gravity scales with speed so early jumps are long and floaty
      const gravity = Math.min(GRAVITY_MAX, GRAVITY_MIN + gs.frameCount * 0.00004);
      if (gs.isJumping) {
        gs.corgiVY += gravity;
        gs.corgiY += gs.corgiVY;
        if (gs.corgiY >= GROUND_Y) {
          gs.corgiY = GROUND_Y;
          gs.corgiVY = 0;
          gs.isJumping = false;
        }
      }

      // Leg animation
      if (!gs.isJumping && gs.frameCount % 6 === 0) {
        gs.legFrame++;
      }

      // Score
      if (gs.frameCount % 6 === 0) {
        gs.score++;
        setDisplayScore(gs.score);
      }

      // Score milestone sound
      if (gs.score > 0 && gs.score % 100 === 0 && gs.frameCount % 6 === 0) {
        playBoingUp();
      }

      // Spawn obstacles
      if (gs.frameCount - gs.lastSpawnFrame >= gs.nextSpawnGap) {
        if (gs.obstacles.length < 5) {
          spawnObstacle(gs);
          gs.lastSpawnFrame = gs.frameCount;
          // Starts with big gaps, slowly tightens
          const minGap = Math.max(55, 140 - gs.frameCount * 0.008);
          gs.nextSpawnGap = minGap + Math.random() * 50;
        }
      }

      // Move obstacles
      for (const obs of gs.obstacles) {
        obs.x -= gs.speed;
      }

      // Remove off-screen
      gs.obstacles = gs.obstacles.filter((o) => o.x + o.w > -20);

      // Collision detection (forgiving hitbox — 6px inset)
      const cx = CORGI_X + 6;
      const cy = gs.corgiY - CORGI_H + 6;
      const cw = CORGI_W - 12;
      const ch = CORGI_H - 6;

      for (const obs of gs.obstacles) {
        if (
          cx < obs.x + obs.w &&
          cx + cw > obs.x &&
          cy < obs.y + obs.h &&
          cy + ch > obs.y
        ) {
          // Collision!
          gs.status = "gameover";
          setGameStatus("gameover");
          if (gs.score > gs.highScore) {
            gs.highScore = gs.score;
            try { localStorage.setItem("squish-high-score", String(gs.score)); } catch { /* noop */ }
          }
          playBoingDown();

          // Signal game completed (for story reveal)
          if (!hasCompletedRef.current && onGameComplete) {
            hasCompletedRef.current = true;
            onGameComplete();
          }
          break;
        }
      }
    }

    // Draw everything
    drawGround(ctx, gs);
    for (const obs of gs.obstacles) drawObstacle(ctx, obs);
    drawCorgi(ctx, gs);
    drawUI(ctx, gs);

    rafRef.current = requestAnimationFrame(gameLoop);
  }, [onGameComplete]);

  // Start the render loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  // Handle jump input
  const handleJump = useCallback(() => {
    const gs = gameRef.current;

    if (gs.status === "idle") {
      gs.status = "running";
      setGameStatus("running");
      gs.frameCount = 0;
      gs.score = 0;
      gs.obstacles = [];
      gs.speed = 3;
      gs.lastSpawnFrame = 0;
      gs.nextSpawnGap = 140;
      setDisplayScore(0);
      return;
    }

    if (gs.status === "gameover") {
      // Reset
      Object.assign(gs, createInitialState());
      gs.status = "running";
      setGameStatus("running");
      setDisplayScore(0);
      return;
    }

    if (gs.status === "running" && !gs.isJumping) {
      gs.isJumping = true;
      gs.corgiVY = JUMP_VEL;
      playBoingSmall();
    }
  }, []);

  // Keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleJump]);

  return (
    <div className="my-8">
      {/* Instructions */}
      <p className="storybook-text text-center text-sm mb-4 opacity-70">
        {gameStatus === "idle" && "Help Squish save the studio! Press SPACE or tap to jump."}
        {gameStatus === "running" && `Score: ${displayScore}`}
        {gameStatus === "gameover" && `Game Over! Score: ${displayScore}`}
      </p>

      {/* Game canvas */}
      <div className="game-frame p-2 mx-auto" style={{ maxWidth: CANVAS_W + 16 }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          onClick={handleJump}
          onTouchStart={(e) => { e.preventDefault(); handleJump(); }}
          className="w-full h-auto block"
          role="img"
          aria-label="Squish the Corgi Runner Game — press space or tap to jump over obstacles"
        />
      </div>

      {/* Skip game link for accessibility */}
      <p className="text-center mt-4">
        <button
          onClick={() => {
            if (!hasCompletedRef.current && onGameComplete) {
              hasCompletedRef.current = true;
              onGameComplete();
            }
          }}
          className="storybook-text text-sm underline opacity-40 hover:opacity-70 transition-opacity"
          style={{ color: "#2a2118" }}
        >
          Skip game and continue the story
        </button>
      </p>
    </div>
  );
}
