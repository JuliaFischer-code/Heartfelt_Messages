import { useMemo } from "react";

/**
 * FloatingHearts
 * - Renders N hearts that float upward with subtle sway.
 * - Randomized size, speed, x-position, delay, and opacity.
 * - Pointer-events: none (never blocks clicks).
 * - Respects prefers-reduced-motion.
 */
export default function FloatingHearts({
  count = 18,
  seed = 42,
  colors = ["#ff7096", "#ff8fab", "#ffccd5", "#fb6f92", "#ff4d6d"],
  minSize = 14,
  maxSize = 40,
  minDuration = 12,
  maxDuration = 24,
  minDelay = 0,
  maxDelay = 12,
  zIndex = 0,
}: {
  count?: number;
  seed?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minDuration?: number; // seconds
  maxDuration?: number; // seconds
  minDelay?: number;    // seconds
  maxDelay?: number;    // seconds
  zIndex?: number;
}) {
  // tiny deterministic RNG so server/client render the same layout
  const rand = (s: number) => {
    let x = Math.sin(s * 9999 + seed) * 10000;
    return x - Math.floor(x);
  };

  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const r1 = rand(i + 1);
        const r2 = rand(i + 2);
        const r3 = rand(i + 3);
        const r4 = rand(i + 4);
        const size = Math.round(minSize + r1 * (maxSize - minSize));
        const left = Math.round(r2 * 100); // %
        const duration = +(minDuration + r3 * (maxDuration - minDuration)).toFixed(2);
        const delay = +(minDelay + r4 * (maxDelay - minDelay)).toFixed(2);
        const color = colors[i % colors.length];
        const opacity = 0.35 + r1 * 0.45; // 0.35–0.8
        const sway = 6 + r4 * 12; // px
        return { id: i, size, left, duration, delay, color, opacity, sway };
      }),
    [count, seed, colors, minSize, maxSize, minDuration, maxDuration, minDelay, maxDelay]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex,
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes floatUp {
          0%   { transform: translate3d(var(--dx, 0px), 110%, 0) scale(var(--scale, 1)); }
          100% { transform: translate3d(var(--dx, 0px), -120%, 0) scale(var(--scale, 1)); }
        }
        @keyframes sway {
          0%   { transform: translateX(0) rotate(0deg); }
          50%  { transform: translateX(var(--sway, 10px)) rotate(2deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .heart-float, .heart-sway { animation: none !important; }
        }
      `}</style>

      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart-float"
          style={{
            position: "absolute",
            left: `${h.left}%`,
            bottom: "-10%",
            width: h.size,
            height: h.size,
            transform: "translate3d(0, 110%, 0)",
            animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            // per-instance CSS vars
            // slight random scale & drift without layout thrash
            // @ts-ignore - CSS var string
            ["--dx" as any]: `${(h.left - 50) / 25}px`,
            ["--scale" as any]: `${0.9 + (h.size - minSize) / (maxSize - minSize + 0.0001) * 0.2}`,
          }}
        >
          <div
            className="heart-sway"
            style={{
              width: "100%",
              height: "100%",
              animation: `sway ${Math.max(3, h.duration / 4)}s ease-in-out ${h.delay}s infinite`,
              // @ts-ignore
              ["--sway" as any]: `${h.sway}px`,
              opacity: h.opacity,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
            }}
          >
            <HeartSVG fill={h.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

function HeartSVG({ fill = "#ff4d6d" }: { fill?: string }) {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 29s-8.4-5.8-12.2-9.6C.6 16.2.9 11.1 4.4 8.2c3.5-2.9 8.1-1.9 10.1 1.2 2-3.1 6.6-4.1 10.1-1.2 3.5 2.9 3.8 8 .6 11.2C24.4 23.2 16 29 16 29z"
        fill={fill}
      />
    </svg>
  );
}
