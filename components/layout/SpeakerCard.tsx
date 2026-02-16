"use client";
import { Link as LinkType } from "@/hooks/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface SpeakerCardProps {
  name: string;
  position: string;
  image: string;
  links: LinkType[];
  speakerId: string;
  year: number;
}

const extractSocialLink = (links: LinkType[], linkType: string) => {
  return links.find((link) => link.linkType === linkType)?.url;
};

export default function SpeakerCard({ name, position, image, links, speakerId, year }: Readonly<SpeakerCardProps>) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="speaker-card h-100"
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
      <div className="speaker-image-wrapper position-relative" style={{ paddingTop: "100%", overflow: "hidden" }}>
        <Link href={`/${year}/speakers/${speakerId}`} className="d-block w-100 h-100 position-absolute top-0 start-0">
          <Image
            src={image}
            alt={name}
            fill
            className="speaker-image"
            style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>

      <div className="speaker-content p-4 d-flex flex-column flex-grow-1" style={{ gap: "12px", textAlign: "center" }}>
        <h4 className="speaker-name mb-0" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          <Link href={`/${year}/speakers/${speakerId}`} style={{ color: "#111827", textDecoration: "none" }} className="text-hover-primary">
            {name}
          </Link>
        </h4>

        {position && (
          <p className="speaker-position text-muted mb-0" style={{ fontSize: "0.9rem", lineHeight: 1.4, flexGrow: 1 }}>
            {position}
          </p>
        )}

        <div className="speaker-socials d-flex justify-content-center gap-3 mt-2">
          {extractSocialLink(links, "Twitter") && (
            <Link href={extractSocialLink(links, "Twitter")!} className="social-link text-secondary hover-primary">
              <i className="fa-brands fa-twitter fa-lg" />
            </Link>
          )}
          {extractSocialLink(links, "LinkedIn") && (
            <Link href={extractSocialLink(links, "LinkedIn")!} className="social-link text-secondary hover-primary">
              <i className="fa-brands fa-linkedin-in fa-lg" />
            </Link>
          )}
          {extractSocialLink(links, "Instagram") && (
            <Link href={extractSocialLink(links, "Instagram")!} className="social-link text-secondary hover-primary">
              <i className="fa-brands fa-instagram fa-lg" />
            </Link>
          )}
          {extractSocialLink(links, "bluesky") && (
            <Link href={extractSocialLink(links, "bluesky")!} className="social-link text-secondary hover-primary">
              <i className="fa-brands fa-bluesky fa-lg" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
