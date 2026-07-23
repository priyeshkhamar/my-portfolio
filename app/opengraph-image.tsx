import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const dynamic = "force-static";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated OG card — dark canvas, lime accent, matches the site. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#060607",
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, rgba(200,247,81,0.12), transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(139,124,255,0.14), transparent 55%)",
          color: "#f2f2f0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#c8f751",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#c8f751",
            }}
          />
          Open to full-stack roles
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#9d9da5" }}>
            {`${site.role} — ${site.tagline}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#64646c",
          }}
        >
          <div>React · Node.js · MongoDB · Next.js · TypeScript</div>
          <div style={{ color: "#c8f751" }}>priyeshkhamar.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
