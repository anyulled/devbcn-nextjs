import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import { DEVBCN_LOGO_BASE64 } from "@/lib/og-logo";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DevBcn Call for Papers";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const config = getEditionConfig(year);
  const eventDate = formatEventDateRange(config.event.startDay, config.event.endDay);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0f172a",
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "60px 80px",
      }}
    >
      {/* Logo/Branding Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={DEVBCN_LOGO_BASE64}
          alt="DevBcn Logo"
          width={294}
          height={120}
          style={{
            borderRadius: "12px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-0.05em",
          }}
        >
          DevBcn {year}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            maxWidth: "900px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Call for Papers
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#e0e7ff",
            maxWidth: "800px",
            lineHeight: 1.3,
          }}
        >
          Submit your talk proposal for DevBcn {year}
        </div>

        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#c4b5fd",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>📅</span>
            <span>{eventDate}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>📍</span>
            <span>{config.venue.name}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#e0e7ff",
          fontWeight: 500,
        }}
      >
        www.devbcn.com
      </div>
    </div>,
    {
      ...size,
    }
  );
}
