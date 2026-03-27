"use client";

import { Talk } from "@/hooks/types";
import { getLevelFromTalk, getLevelStars, getTagsFromTalk, getTrackFromTalk } from "@/hooks/useTalks";
import { motion } from "framer-motion";
import { Tag, Users } from "lucide-react";
import Link from "next/link";

interface TalkCardProps {
  talk: Talk;
  year: number | string;
}

export default function TalkCard({ talk, year }: Readonly<TalkCardProps>) {
  const level = getLevelFromTalk(talk);
  const levelStars = getLevelStars(level);
  const tags = getTagsFromTalk(talk);
  const track = getTrackFromTalk(talk);

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="talk-card h-100"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <div className="talk-card-content p-4 d-flex flex-column h-100" style={{ gap: "16px" }}>
        {/* Header: Track & Level */}
        <div className="d-flex justify-content-between align-items-center">
          <span
            className="badge"
            style={{
              backgroundColor: "#e0e7ff",
              color: "#4338ca",
              fontSize: "0.75rem",
              padding: "4px 12px",
              borderRadius: "20px",
              fontWeight: 600,
            }}
          >
            {track?.split("(")[0].trim()}
          </span>
          {levelStars && (
            <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: "0.875rem" }} title={level}>
              <span style={{ color: "#fbbf24" }}>{levelStars}</span>
              <span className="d-none d-sm-inline">{level}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="talk-title mb-0" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.4 }}>
          <Link href={`/${year}/talks/${talk.id}`} style={{ color: "#111827", textDecoration: "none" }} className="text-hover-primary">
            {talk.title}
          </Link>
        </h4>

        {/* Speakers */}
        <div className="d-flex align-items-center gap-2 text-secondary">
          <Users size={16} />
          <div className="talk-speakers" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
            {talk.speakers.map((speaker, index) => (
              <span key={speaker.id}>
                <Link
                  href={`/${year}/speakers/${speaker.id}`}
                  className="text-secondary text-decoration-none hover-underline"
                  style={{ transition: "color 0.2s" }}
                >
                  {speaker.name}
                </Link>
                {index < talk.speakers.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-auto pt-3 border-top">
            <Tag size={14} className="text-muted mt-1" />
            <div className="d-flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Link
                  key={tag + index}
                  href={`/${year}/tags/${tag.replaceAll(" ", "-").toLowerCase()}`}
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    background: "#f3f4f6",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
