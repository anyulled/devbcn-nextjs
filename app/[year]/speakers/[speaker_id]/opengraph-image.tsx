import { getSpeakerByYearAndId } from "@/hooks/useSpeakers";
import { DEVBCN_LOGO_BASE64 } from "@/lib/og-logo";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DevBcn Speaker";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ year: string; speaker_id: string }> }) {
  const { year, speaker_id } = await params;
  const speaker = await getSpeakerByYearAndId(year, speaker_id);

  if (!speaker) {
    // Fallback image if speaker not found
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
        Speaker Not Found
      </div>,
      { ...size }
    );
  }

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundColor: "#0f172a",
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Left side - Speaker Photo */}
      <div
        style={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {speaker.profilePicture ? (
          <img
            src={speaker.profilePicture}
            alt={speaker.fullName}
            style={{
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              border: "8px solid white",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
          />
        ) : (
          <div
            style={{
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              backgroundColor: "#4c1d95",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 120,
              color: "white",
              fontWeight: 700,
              border: "8px solid white",
            }}
          >
            {speaker.fullName.charAt(0)}
          </div>
        )}
      </div>

      {/* Right side - Speaker Info */}
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px 60px 40px",
          gap: "24px",
        }}
      >
        {/* DevBcn Badge with Logo */}
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
            <span>Speaker</span>
          </div>
        </div>

        {/* Speaker Name */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {speaker.fullName}
        </div>

        {/* Speaker Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: "#e0e7ff",
            lineHeight: 1.3,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {speaker.tagLine}
        </div>

        {/* Session Count */}
        {speaker.sessions.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 28,
              color: "#c4b5fd",
              fontWeight: 600,
            }}
          >
            <span>🎤</span>
            <span>
              {speaker.sessions.length} {speaker.sessions.length === 1 ? "Session" : "Sessions"}
            </span>
          </div>
        )}
      </div>
    </div>,
    {
      ...size,
    }
  );
}
