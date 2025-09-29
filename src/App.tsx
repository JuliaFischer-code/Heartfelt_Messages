import { useState } from "react";
import MessageComposer from "./MessageComposer";
import PaperPlane from "./decor/PaperPlane";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",          // <— important for absolute children
        padding: 32,
        maxWidth: 1200,
        margin: "0 auto",
        color: "#e6e6e6",
        background: "#0b0e11",
        minHeight: "100vh",
        overflow: "hidden",            // hide planes while entering/leaving
      }}
    >
      {!open ? (
        <>
          {/* Decorative planes */}
          <PaperPlane y={90}  duration={10} delay={0}   size={72} opacity={0.5} />
          <PaperPlane y={200} duration={18} delay={6}   size={56} opacity={0.45} reverse />
          <PaperPlane y={320} duration={14} delay={10}  size={64} opacity={0.55} />

          <header
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              <h1 style={{ fontSize: 36, margin: 0 }}>Heartfelt Messages</h1>
              <div style={{ opacity: 0.7, marginTop: 4 }}>
                Send a little love as a flying postcard 💌
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                background: "#0ea5a6",
                border: "none",
                color: "#061314",
                fontWeight: 600,
              }}
            >
              Compose
            </button>
          </header>

          <div
            style={{
              marginTop: 40,
              padding: 24,
              borderRadius: 12,
              background: "#0f1216",
              border: "1px solid #1f2937",
              position: "relative",
              zIndex: 1, // ensure content sits above decorative planes if needed
            }}
          >
            <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.85 }}>
              Tap <b>Compose</b> to write your message. On mobile, use <b>Share image</b> to
              send the heart as an image to WhatsApp/iMessage. On desktop the image downloads.
            </p>
          </div>
        </>
      ) : (
        <MessageComposer name="Heart" onBack={() => setOpen(false)} />
      )}
    </div>
  );
}