import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Section4SpeakerCardProps {
  image: string;
  name: string;
  role: string;
}

export default function Section4SpeakerCard({ image, name, role }: Readonly<Section4SpeakerCardProps>) {
  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="speaker-card">
      <div className="speaker-image-wrapper">
        <Link href="/speakers" className="speaker-image-link">
          <Image src={image} alt={name} fill className="speaker-image" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </Link>
      </div>

      <div className="speaker-content">
        <h4 className="speaker-name mb-0">
          <Link href="/speakers">{name}</Link>
        </h4>

        {role && <p className="speaker-position mb-0">{role}</p>}

        <div className="speaker-socials">
          <Link href="/#" className="social-link">
            <i className="fa-brands fa-facebook-f" />
          </Link>
          <Link href="/#" className="social-link">
            <i className="fa-brands fa-linkedin-in" />
          </Link>
          <Link href="/#" className="social-link">
            <i className="fa-brands fa-instagram" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
