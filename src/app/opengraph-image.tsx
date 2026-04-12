import { readFileSync } from "fs";
import { ImageResponse } from "next/og";
import { join } from "path";

import { SITE_URL } from "@/data/constants";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };

const tag = (label: string) => (
  <div
    style={{
      display: "flex",
      padding: "5px 14px",
      borderRadius: 100,
      border: "1px solid #1f1f1f",
      color: "#3d3d3d",
      fontSize: 14,
      fontFamily: "'JetBrains Mono', monospace",
    }}
  >
    {label}
  </div>
);

export default function OgImage() {
  const avatarBuf = readFileSync(join(process.cwd(), "public", "avatar-og.png"));
  const avatarSrc = `data:image/png;base64,${avatarBuf.toString("base64")}`;
  const interBold = readFileSync(join(process.cwd(), "public", "fonts", "inter-bold.woff"));
  const jetbrainsMono = readFileSync(join(process.cwd(), "public", "fonts", "jetbrains-mono.woff"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          left: 250,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 65%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 52 }}>
        <div
          style={{ display: "flex", position: "relative", flexShrink: 0, width: 220, height: 220 }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              left: -30,
              right: -30,
              bottom: -30,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 65%)",
            }}
          />
          <img
            src={avatarSrc}
            width={220}
            height={220}
            alt="avatar"
            style={{ borderRadius: "50%", border: "3px solid rgba(245,158,11,0.4)" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "#f59e0b",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Senior Software Engineer
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 92,
                fontWeight: 700,
                color: "#f59e0b",
                lineHeight: 0.88,
                letterSpacing: "-3px",
              }}
            >
              Maxime
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 92,
                fontWeight: 700,
                color: "#f9f9f9",
                lineHeight: 0.88,
                letterSpacing: "-3px",
              }}
            >
              Miramond.
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {tag("TypeScript")}
            {tag("NestJS")}
            {tag("PostgreSQL")}
            {tag("GCP")}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#555" }}>
            Aix-en-Provence · France
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 72,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          color: "#2a2a2a",
        }}
      >
        {new URL(SITE_URL).hostname}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: jetbrainsMono, weight: 400, style: "normal" },
      ],
    }
  );
}
