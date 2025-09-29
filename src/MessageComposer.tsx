import { useRef, useState } from "react";
import { shareImageOnly } from "./utils/send";
import { Heart } from "./icons/heart";

export default function MessageComposer({
  onBack,
  name, // kept for compatibility with App.tsx; shown in the header
}: {
  onBack: () => void;
  name: string;
}) {
  const [msg, setMsg] = useState("");
  const svgRef = useRef<SVGSVGElement | null>(null);

  async function handleShareImageOnly() {
    if (!svgRef.current) return;
    try {
      await shareImageOnly(svgRef.current, "heart.png"); // image only, no caption
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      style={{
        padding: 32,
        maxWidth: 1000,
        margin: "0 auto",
        color: "#e6e6e6",
      }}
    >
      <button
        onClick={onBack}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          background: "#222",
          border: "1px solid #333",
          color: "#e6e6e6",
          marginBottom: 16,
        }}
      >
        ← Back
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 24,
        }}
      >
        {/* Left: heart preview with your message drawn inside */}
        <div
          style={{
            background: "#111",
            border: "1px solid #333",
            borderRadius: 10,
            padding: 16,
            display: "grid",
            placeItems: "center",
            height: 320,
          }}
        >
          <Heart ref={svgRef} text={msg || "💌"} />
        </div>

        {/* Right: inputs */}
        <div>
          <h2 style={{ marginTop: 0, fontSize: 28 }}>{name || "Heart Message"}</h2>

          <label style={{ display: "block", marginTop: 12 }}>Message</label>
          <textarea
            rows={6}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              background: "#111",
              border: "1px solid #333",
              color: "#e6e6e6",
            }}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Write your message…"
          />

          <small style={{ display: "block", opacity: 0.7, marginTop: 8 }}>
            Share will attach <b>only the image</b> of the heart. The message is printed on the heart.
          </small>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              onClick={handleShareImageOnly}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "#0ea5a6",
                border: "none",
                color: "#061314",
                fontWeight: 600,
              }}
            >
              Share image only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}