// src/assets/decor/FloatingHearts.tsx
import { useEffect, useRef } from "react";

export default function FloatingHearts({
  count = 16,
  zIndex = 0,
}: {
  count?: number;
  zIndex?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // particles
    const hearts = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      s: 0.6 + Math.random() * 1.1, // size
      v: 18 + Math.random() * 22,   // vertical speed
      h: 20 + Math.random() * 40,   // horizontal sway amplitude
      p: Math.random() * Math.PI * 2, // phase
    }));

    const drawHeart = (x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size, size);
      ctx.beginPath();
      // small rounded heart path
      ctx.moveTo(0, -6);
      ctx.bezierCurveTo(6, -12, 16, -6, 16, 4);
      ctx.bezierCurveTo(16, 14, 6, 20, 0, 26);
      ctx.bezierCurveTo(-6, 20, -16, 14, -16, 4);
      ctx.bezierCurveTo(-16, -6, -6, -12, 0, -6);
      const grd = ctx.createLinearGradient(-16, -12, 16, 26);
      grd.addColorStop(0, "rgba(244,63,94,0.9)");  // #f43f5e
      grd.addColorStop(1, "rgba(225,29,72,0.7)");  // #e11d48
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      hearts.forEach((h) => {
        // sway left/right while moving up
        h.p += 0.015 * h.s;
        h.y -= (h.v * 0.016) * h.s;
        const x = h.x + Math.sin(h.p) * h.h;

        drawHeart(x, h.y, h.s);

        // recycle when off the top
        if (h.y < -40) {
          h.y = height + 40;
          h.x = Math.random() * width;
          h.s = 0.6 + Math.random() * 1.1;
          h.v = 18 + Math.random() * 22;
          h.h = 20 + Math.random() * 40;
          h.p = Math.random() * Math.PI * 2;
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    const onResize = () => resize();
    resize();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", opacity: 0.9 }}
      />
    </div>
  );
}