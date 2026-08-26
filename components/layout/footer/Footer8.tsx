"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer8() {
  const pathname = usePathname();
  const [copyrightYear, setCopyrightYear] = useState<number>();

  useEffect(() => {
    setCopyrightYear(new Date().getFullYear());
  }, []);

  const yearMatch = /^\/(\d{4})/.exec(pathname);
  const currentYear = yearMatch ? yearMatch[1] : "2026";
  const basePath = `/${currentYear}`;
  const rootPath = "";

  return (
    <div className="footer8-sertion-area">
      <Image src="/assets/img/bg/header-bg21.png" alt="Footer Background" fill priority style={{ objectFit: "cover", zIndex: -3 }} />
      <Image src="/assets/img/elements/layer1.png" alt="" width={1440} height={230} className="layer1" loading="lazy" />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <div className="footer-logo-area">
              <Image src="/assets/img/logo/devBcn.webp" alt="devBcn" width={150} height={76} />
              <div className="space16" />
              <p>Barcelona Developers Conference</p>
              <div className="space24" />
              <ul>
                <li>
                  <a href="https://twitter.com/dev_bcn" className="m-0" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/devbcn.conf/" className="m-0" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/devbcn/" className="m-0" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/devbcn.bsky.social" className="m-0" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-bluesky"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@DevBcn" className="m-0" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.flickr.com/photos/devbcn" className="m-0" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-flickr"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="link-content">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link href={`${basePath}/travel`}>Travel to Barcelona</Link>
                </li>
                <li>
                  <Link href={`${basePath}/speakers`}>Speakers</Link>
                </li>
                <li>
                  <Link href={`${basePath}/talks`}>Talks</Link>
                </li>
                <li>
                  <Link href={`${basePath}/sponsorship`}>Sponsorship {currentYear}</Link>
                </li>
                <li>
                  <Link href={`${rootPath}/about-us`}>About Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="link-content2">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <Link href="#">
                    <Image src="/assets/img/icons/location1.svg" alt="" width={16} height={16} />
                    World Trade Center, Barceclona
                  </Link>
                </li>
                <li>
                  <Link href="mailto:info@devbcn.com">
                    <Image src="/assets/img/icons/mail1.svg" alt="" width={16} height={16} />
                    info@devbcn.com
                  </Link>
                </li>
                <li>
                  <Link href="https://devbcn.com" target="_blank" rel="noopener noreferrer">
                    <Image src="/assets/img/icons/world1.svg" alt="" width={16} height={16} />
                    devbcn.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space60" />
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright">
              <p>© Copyright {copyrightYear ?? ""} - DevBcn. All Right Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
