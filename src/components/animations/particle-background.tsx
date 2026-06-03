"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    // Create particles
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; hue: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
        hue: Math.random() > 0.5 ? 270 : 250, // purple range
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += (dx / dist) * 0.01;
          p.vy += (dy / dist) * 0.01;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
        ctx.fill();

        // Draw lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = particles[j].x - p.x;
          const dy2 = particles[j].y - p.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(265, 60%, 60%, ${0.04 * (1 - dist2 / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <>
      {/* CSS animated grid background — always visible */}
      <div className="fixed inset-0 -z-20 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        animation: "drift 20s linear infinite",
      }} />

      {/* Canvas particle layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      {/* Purple glow orbs */}
      <div className="fixed top-1/4 left-1/4 -z-20 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/[0.02] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 -z-20 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#7c3aed]/[0.03] blur-[120px] pointer-events-none" />

      <style jsx>{`
        @keyframes drift {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>
    </>
  );
}
