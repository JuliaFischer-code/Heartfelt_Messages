// Minimal floating hearts: no CSS vars, no TypeScript tricks.
// If this renders, your page won't be blank anymore.
export default function FloatingHearts({
    count = 16,
    zIndex = 0,
  }: {
    count?: number;
    zIndex?: number;
  }) {
    const hearts = Array.from({ length: count }).map((_, i) => {
      const size = 12 + (i % 12) * 2;           // 12–34px
      const left = (i * 13) % 100;              // 0–99 %
      const duration = 14 + (i % 10);           // 14–23s
      const delay = (i * 0.7) % 8;              // 0–8s
      const opacity = 0.4 + ((i % 5) * 0.1);    // 0.4–0.8
      const color = ["#ff8fab", "#ff7096", "#fb6f92", "#ff4d6d", "#ffccd5"][i % 5];
      return { id: i, size, left, duration, delay, opacity, color };
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
          @media (prefers-reduced-motion: reduce) {
            .heart-float { animation: none !important; }
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
              opacity: h.opacity,
              animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
            }}
          >
            <svg viewBox="0 0 32 32" width="100%" height="100%">
              <path
                d="M16 29s-8.4-5.8-12.2-9.6C.6 16.2.9 11.1 4.4 8.2c3.5-2.9 8.1-1.9 10.1 1.2 2-3.1 6.6-4.1 10.1-1.2 3.5 2.9 3.8 8 .6 11.2C24.4 23.2 16 29 16 29z"
                fill={h.color}
              />
            </svg>
          </div>
        ))}
      </div>
    );
  }  