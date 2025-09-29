import { useState } from "react";
import MessageComposer from "./MessageComposer";
import FloatingHearts from "./decor/FloatingHearts";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        padding: 32,
        maxWidth: 1200,
        margin: "0 auto",
        color: "#e6e6e6",
        background: "#0b0e11",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {!open ? (
        <>
          <FloatingHearts count={18} zIndex={0} />

          <header
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ fontSize: 36, margin: 0 }}>Heart Messages</h1>
              <div style={{ opacity: 0.7, marginTop: 4 }}>
                Send a little love as a picture 💌
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
              position: "relative",
              zIndex: 1,
              marginTop: 40,
              padding: 24,
              borderRadius: 12,
              background: "#0f1216",
              border: "1px solid #1f2937",
            }}
          >
            <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.85 }}>
              Tap <b>Compose</b> to write your message. On mobile, <b>Share image</b> sends your
              heart as a PNG to WhatsApp/iMessage. On desktop the image downloads.
            </p>
          </div>
        </>
      ) : (
        <MessageComposer name="Heart" onBack={() => setOpen(false)} />
      )}
    </div>
  );
}