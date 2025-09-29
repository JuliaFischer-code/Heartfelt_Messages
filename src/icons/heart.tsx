import React, { forwardRef, useMemo } from "react";

type HeartProps = {
  text: string;
  fill?: string;        // heart color
  textColor?: string;   // message color
};

// naive word-wrapping for SVG <text>
function wrapText(text: string, maxCharsPerLine = 24) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  words.forEach((w) => {
    const tryLine = line ? line + " " + w : w;
    if (tryLine.length > maxCharsPerLine) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = tryLine;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 7); // safety: cap lines so it doesn't overflow forever
}

export const Heart = forwardRef<SVGSVGElement, HeartProps>(
  ({ text, fill = "#e11d48", textColor = "#fff" }, ref) => {
    const lines = useMemo(() => wrapText(text, 28), [text]);

    return (
      <svg
        ref={ref}
        viewBox="0 0 512 512"
        width="256"
        height="256"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Heart shape */}
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={fill} stopOpacity="0.95" />
            <stop offset="1" stopColor={fill} stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M256 472c-9 0-18-3-25-10L95 338C37 283 32 197 86 141c41-43 109-45 154-7l16 14 16-14c45-38 113-36 154 7 54 56 49 142-9 197L281 462c-7 7-16 10-25 10z"
          fill="url(#g)"
        />
        {/* Soft inner highlight */}
        <path
          d="M256 420c-6 0-12-2-17-7L130 314c-42-39-46-101-9-138 31-31 82-32 116-4l19 16 19-16c34-28 85-27 116 4 37 37 33 99-9 138L273 413c-5 5-11 7-17 7z"
          fill="#000"
          opacity="0.12"
        />

        {/* Message block */}
        <g>
          {lines.map((ln, i) => (
            <text
              key={i}
              x="256"
              y={220 + i * 34}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
              fontSize="28"
              fontWeight={600}
              fill={textColor}
              style={{ paintOrder: "stroke" }}
            >
              {ln}
            </text>
          ))}
        </g>
      </svg>
    );
  }
);
