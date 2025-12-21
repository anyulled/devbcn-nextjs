import Link from "next/link";
import { Link as LinkType } from "@/hooks/types";

interface SpeakerCardProps {
  name: string;
  position: string;
  image: string;
  links: LinkType[];
}

const extractSocialLink = (links: LinkType[], linkType: string) => {
  return links.filter((link) => link.linkType === linkType).at(0)?.url;
};

export default function SpeakerCard({
  name,
  position,
  image,
  links,
}: SpeakerCardProps) {
  return (
    <div className="our-team-boxarea">
      <div className="team-widget-area">
        <img
          src="/assets/img/elements/elements25.png"
          alt=""
          className="elements21"
        />
        <img
          src="/assets/img/elements/elements26.png"
          alt=""
          className="elements22"
        />
        <div className="img1">
          <img src={image} alt={name} className="team-img4" />
          <div className="share">
            <Link href="/#">
              <img src="/assets/img/icons/share1.svg" alt="" />
            </Link>
          </div>
          <ul>
            <li>
              <Link
                href={extractSocialLink(links, "Twitter") || "#"}
                className="icon1"
              >
                <i className="fa-brands fa-twitter" />
              </Link>
            </li>
            <li>
              <Link
                href={extractSocialLink(links, "LinkedIn") || "#"}
                className="icon2"
              >
                <i className="fa-brands fa-linkedin-in" />
              </Link>
            </li>
            <li>
              <Link
                href={extractSocialLink(links, "Instagram") || "#"}
                className="icon3"
              >
                <i className="fa-brands fa-instagram" />
              </Link>
            </li>
            <li>
              <Link
                href={extractSocialLink(links, "bluesky") || "#"}
                className="icon4"
              >
                <i className="fa-brands fa-bluesky" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="space28" />
      <div className="content-area">
        <Link href="/speakers-single">{name}</Link>
        <div className="space16" />
        <p>{position}</p>
      </div>
    </div>
  );
}
