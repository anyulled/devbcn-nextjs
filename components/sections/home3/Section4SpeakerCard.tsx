import Link from "next/link";

interface Section4SpeakerCardProps {
  image: string;
  name: string;
  role: string;
}

export default function Section4SpeakerCard({ image, name, role }: Section4SpeakerCardProps) {
  return (
    <>
      <div className="team-widget-area">
        <img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
        <img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
        <div className="img1">
          <img src={image} alt="" className="team-img4" />
          <div className="share">
            <Link href="/#">
              <img src="/assets/img/icons/share1.svg" alt="" />
            </Link>
          </div>
          <ul>
            <li>
              <Link href="/#" className="icon1">
                <i className="fa-brands fa-facebook-f" />
              </Link>
            </li>
            <li>
              <Link href="/#" className="icon2">
                <i className="fa-brands fa-linkedin-in" />
              </Link>
            </li>
            <li>
              <Link href="/#" className="icon3">
                <i className="fa-brands fa-instagram" />
              </Link>
            </li>
            <li>
              <Link href="/#" className="icon4">
                <i className="fa-brands fa-pinterest-p" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="space28" />
      <div className="content-area">
        <Link href="/speakers">{name}</Link>
        <div className="space16" />
        <p>{role}</p>
      </div>
    </>
  );
}
