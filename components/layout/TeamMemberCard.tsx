"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Member {
  id: number;
  name: string;
  job: string;
  profileUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
}

interface TeamMemberCardProps {
  member: Member;
}

export default function TeamMemberCard({ member }: Readonly<TeamMemberCardProps>) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="team-card h-100"
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
      <div className="member-image-wrapper position-relative" style={{ paddingTop: "100%", overflow: "hidden" }}>
        <Image
          src={member.profileUrl}
          alt={member.name}
          fill
          className="member-image"
          style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="member-content p-4 d-flex flex-column flex-grow-1" style={{ gap: "12px", textAlign: "center" }}>
        <h4 className="member-name mb-0" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          <span style={{ color: "#111827" }}>{member.name}</span>
        </h4>

        <p className="member-job text-muted mb-0" style={{ fontSize: "0.9rem", lineHeight: 1.4, flexGrow: 1 }}>
          {member.job}
        </p>

        <div className="member-socials d-flex justify-content-center gap-3 mt-2">
          {member.twitterUrl && (
            <Link href={member.twitterUrl} className="social-link text-secondary hover-primary" target="_blank">
              <i className="fa-brands fa-twitter fa-lg" />
            </Link>
          )}
          {member.linkedinUrl && (
            <Link href={member.linkedinUrl} className="social-link text-secondary hover-primary" target="_blank">
              <i className="fa-brands fa-linkedin-in fa-lg" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
