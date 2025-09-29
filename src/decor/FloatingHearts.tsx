// Safe, minimal floating hearts (no CSS custom props, no TypeScript tricks)
export default function FloatingHearts({
    count = 18,
    colors = ["#ff7096", "#ff8fab", "#ffccd5", "#fb6f92", "#ff4d6d"],
    zIndex = 0,
  }: {
    count?: number;
    colors?: string[];
    zIndex?: number;
  }) {
    const hearts = Array.from({ length: count }).map((_, i) => {
      const size = 12 + ((i * 23) % 28);            // 12–40px
      const left = ((i * 37) % 100);                // 0–100%
      const duration = 14 + ((i * 7) % 12);         // 14–25s
      const delay = (i * 0.9) % 10;                 // 0–10s
      const color = colors[i % colors.length];
      const opacity = 0.35 + ((i * 13) % 45) / 100; // 0.35–0.8
      const sway = 4 + ((i * 11) % 10);             // 4–14px
      return { id: i, size, left, duration, delay, color, opacity, sway };
    });
  
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
            0%   { transform: translateY(110%); }
            100% { transform: translateY(-120%); }
          }
          @keyframes sway {
            0%   { transform: translateX(0) rotate(0deg); }
            50%  { transform: translateX(var(--sway, 8px)) rotate(2deg); }
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
              animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            }}
          >
            <div
              className="heart-sway"
              style={{
                width: "100%",
                height: "100%",
                animation: `sway ${Math.max(3, h.duration / 4)}s ease-in-out ${h.delay}s infinite`,
                opacity: h.opacity,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                // just bake the sway directly, no CSS vars
                transform: `translateX(0)`,
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