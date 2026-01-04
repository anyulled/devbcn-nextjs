import { getLevelFromTalk, getTalkByYearAndId, getTrackFromTalk } from "@/hooks/useTalks";
import { DEVBCN_LOGO_BASE64 } from "@/lib/og-logo";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DevBcn Talk";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ year: string; talk_id: string }> }) {
  const { year, talk_id } = await params;
  const talk = await getTalkByYearAndId(year, talk_id);

  if (!talk) {
    // Fallback image if talk not found
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "white",
          fontSize: 48,
        }}
      >
        Talk Not Found
      </div>,
      { ...size }
    );
  }

  const track = getTrackFromTalk(talk);
  const level = getLevelFromTalk(talk);
  const speakerNames = talk.speakers.map((s) => s.name).join(", ");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f172a",
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "60px 80px",
      }}
    >
      {/* Header - DevBcn Badge & Track */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <img
            src={DEVBCN_LOGO_BASE64}
            alt="DevBcn Logo"
            width={147}
            height={60}
            style={{
              borderRadius: "8px",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 32,
              fontWeight: 700,
              color: "#e0e7ff",
            }}
          >
            <span>DevBcn {year}</span>
            <span style={{ color: "#a78bfa" }}>•</span>
            <span>Talk</span>
          </div>
        </div>
        {track && (
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "12px 24px",
              borderRadius: "24px",
              fontSize: 24,
              fontWeight: 600,
              color: "white",
            }}
          >
            {track}
          </div>
        )}
      </div>

      {/* Main Content - Talk Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          {talk.title}
        </div>

        {/* Speaker Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 32,
              fontWeight: 600,
              color: "white",
            }}
          >
            <span>🎤</span>
            <span>{speakerNames}</span>
          </div>
          {level && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#c4b5fd",
                fontWeight: 500,
              }}
            >
              Level: {level}
            </div>
          )}
        </div>
      </div>

      {/* Footer - Website */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 24,
          color: "#e0e7ff",
          fontWeight: 500,
          marginTop: "32px",
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
