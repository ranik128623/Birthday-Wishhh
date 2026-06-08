/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  emoji: string | null;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  gravity: number;
  decay: number;
}

const COLORS = [
  "#FF007F", // Bright Pink
  "#FFD700", // Gold
  "#00E5FF", // Neon Cyan
  "#7FFF00", // Chartreuse
  "#FF6D00", // Vibrant Orange
  "#9C27B0", // Rich Purple
  "#FF3D00", // Coral Red
  "#4CAF50", // Fresh Green
];

const EMOJIS = ["🎉", "🎂", "🎈", "🍰", "🥳", "😂", "💖", "✨", "🎁"];

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create a particle
    const createParticle = (
      x: number,
      y: number,
      isExplosion = false,
      useEmoji = false
    ): Particle => {
      const size = useEmoji
        ? Math.random() * 15 + 15  // Larger for emojis
        : Math.random() * 8 + 5;   // Smaller for shapes

      const emoji = useEmoji ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : null;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      const angle = isExplosion
        ? Math.random() * Math.PI * 2
        : Math.random() * Math.PI + Math.PI; // Upwards for general stream

      const velocity = isExplosion
        ? Math.random() * 12 + 4
        : Math.random() * 4 + 2;

      return {
        x,
        y,
        size,
        color,
        emoji,
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        opacity: 1,
        gravity: isExplosion ? 0.25 : 0.08,
        decay: isExplosion ? 0.008 + Math.random() * 0.01 : 0.003 + Math.random() * 0.005,
      };
    };

    // Spawn subtle ambient rain of confetti on load
    const spawnTimer = setInterval(() => {
      if (document.hidden) return;
      if (particlesRef.current.length < 120) {
        // Spawn from top randomly
        particlesRef.current.push(
          createParticle(Math.random() * width, -20, false, Math.random() > 0.85)
        );
      }
    }, 450);

    // Blast event handler
    const handleBurst = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number; forceEmoji?: boolean }>;
      const { x, y, forceEmoji } = customEvent.detail || { x: width / 2, y: height / 2, forceEmoji: false };

      const count = forceEmoji ? 45 : 85;
      for (let i = 0; i < count; i++) {
        // Create full mix of geometries and emojis
        particlesRef.current.push(
          createParticle(x, y, true, forceEmoji ? true : Math.random() > 0.65)
        );
      }
    };

    window.addEventListener("confetti-burst", handleBurst as EventListener);

    // Draw & Update Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.x * 0.001 + p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        // Friction simulation
        p.speedX *= 0.98;
        p.speedY *= 0.98;

        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > height + 50 || p.x < -50 || p.x > width + 50) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.emoji) {
          ctx.font = `${p.size}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.emoji, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          // Randomly draw circle, square, or triangle
          const shapeType = i % 3;
          if (shapeType === 0) {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (shapeType === 1) {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          } else {
            ctx.beginPath();
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.closePath();
            ctx.fill();
          }
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("confetti-burst", handleBurst as EventListener);
      clearInterval(spawnTimer);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="confetti-canvas"
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}

// Global helper to trigger confetti bursts from any React component
export function triggerConfetti(x?: number, y?: number, forceEmoji = false) {
  const customX = x ?? window.innerWidth / 2;
  const customY = y ?? window.innerHeight / 2;
  const event = new CustomEvent("confetti-burst", {
    detail: { x: customX, y: customY, forceEmoji },
  });
  window.dispatchEvent(event);
}
