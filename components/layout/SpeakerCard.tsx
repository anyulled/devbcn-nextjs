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
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="speaker-card">
      <div className="speaker-image-wrapper">
        <Link href={`/${year}/speakers/${speakerId}`} className="speaker-image-link">
          <Image src={image} alt={name} fill className="speaker-image" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </Link>
      </div>

      <div className="speaker-content">
        <h4 className="speaker-name mb-0">
          <Link href={`/${year}/speakers/${speakerId}`}>{name}</Link>
        </h4>

        {position && <p className="speaker-position mb-0">{position}</p>}

        <div className="speaker-socials">
          {extractSocialLink(links, "Twitter") && (
            <Link href={extractSocialLink(links, "Twitter")!} className="social-link">
              <i className="fa-brands fa-twitter fa-lg" />
            </Link>
          )}
          {extractSocialLink(links, "LinkedIn") && (
            <Link href={extractSocialLink(links, "LinkedIn")!} className="social-link">
              <i className="fa-brands fa-linkedin-in fa-lg" />
            </Link>
          )}
          {extractSocialLink(links, "Instagram") && (
            <Link href={extractSocialLink(links, "Instagram")!} className="social-link">
              <i className="fa-brands fa-instagram fa-lg" />
            </Link>
          )}
          {extractSocialLink(links, "bluesky") && (
            <Link href={extractSocialLink(links, "bluesky")!} className="social-link">
              <i className="fa-brands fa-bluesky fa-lg" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
