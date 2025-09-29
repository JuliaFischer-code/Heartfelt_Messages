import React from "react";

/**
 * A lightweight animated paper plane that flies across the screen.
 * - No dependencies
 * - Respects prefers-reduced-motion
 * - Set different y/duration/delay/size to create variety
 */
export default function PaperPlane({
  y = 80,            // vertical position in px from the top of the container
  duration = 14,     // seconds to cross
  delay = 0,         // seconds to wait before starting
  size = 64,         // plane size in px
  reverse = false,   // fly right->left when true
  opacity = 0.6,     // plane opacity
}: {
  y?: number;
  duration?: number;
  delay?: number;
  size?: number;
  reverse?: boolean;
  opacity?: number;
}) {
  const dir = reverse ? -1 : 1;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <style>
        {`
        @keyframes flyAcross {
          0%   { transform: translateX(${reverse ? "110%" : "-10%"}) }
          100% { transform: translateX(${reverse ? "-10%" : "110%"}) }
        }
        @keyframes bob {
          0%   { transform: translateY(0) rotate(0.5deg); }
          50%  { transform: translateY(-6px) rotate(-0.5deg); }
          100% { transform: translateY(0) rotate(0.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .plane-fly, .plane-bob { animation: none !important; }
        }
      `}
      </style>

      {/* Track that moves horizontally */}
      <div
        className="plane-fly"
        style={{
          position: "absolute",
          top: y,
          left: 0,
          right: 0,
          height: size,
          animation: `flyAcross ${duration}s linear ${delay}s infinite`,
        }}
      >
        {/* Bobbing wrapper for subtle up/down */}
        <div
          className="plane-bob"
          style={{
            display: "inline-block",
            animation: `bob 3.2s ease-in-out ${delay}s infinite`,
            transformOrigin: "center",
            opacity,
          }}
        >
          <PaperPlaneSVG
            width={size}
            height={size}
            style={{
              transform: `scale(${dir}, 1)`, // flip when reverse
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PaperPlaneSVG(
  props: React.SVGProps<SVGSVGElement> & { width?: number; height?: number }
) {
  const { width = 64, height = 64, style } = props;
  return (
    <svg
      viewBox="0 0 64 64"
      width={width}
      height={height}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* subtle shadow */}
      <ellipse cx="20" cy="56" rx="14" ry="3" fill="#000" opacity="0.18" />
      {/* body */}
      <path d="M4 32 L60 16 L36 40 L28 36 Z" fill="#9bd4d5" />
      {/* fold */}
      <path d="M4 32 L28 36 L24 48 Z" fill="#6fb4b5" />
      {/* highlight */}
      <path d="M60 16 L36 40 L40 28 Z" fill="#c8eeef" opacity="0.8" />
      {/* tail line */}
      <path d="M14 38 C10 40, 6 44, 8 48" stroke="#6fb4b5" strokeWidth="2" fill="none" opacity="0.7" />
    </svg>
  );
}