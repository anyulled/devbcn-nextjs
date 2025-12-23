"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer8() {
  const pathname = usePathname();

  const yearMatch = pathname.match(/^\/(\d{4})/);
  const basePath = yearMatch ? `/${yearMatch[1]}` : "";

  return (
    <div
      className="footer8-sertion-area"
      style={{
        backgroundImage: "url(/assets/img/bg/header-bg21.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src="/assets/img/elements/layer1.png" alt="" className="layer1" />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-logo-area">
              <img src="/assets/img/logo/devBcn.webp" alt="devBcn" />
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
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
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
                  <Link href={`${basePath}/sponsorship`}>Sponsorship</Link>
                </li>
                <li>
                  <Link href={`${basePath}/about-us`}>About Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="link-content2">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <Link href="#">
                    <img src="/assets/img/icons/location1.svg" alt="" />
                    World Trade Center, Barceclona
                  </Link>
                </li>
                <li>
                  <Link href="mailto:info@devbcn.com">
                    <img src="/assets/img/icons/mail1.svg" alt="" />
                    info@devbcn.com
                  </Link>
                </li>
                <li>
                  <Link href="https://devbcn.com" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/img/icons/world1.svg" alt="" />
                    devbcn.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="footer-social-box">
              <h3>Our Recent Event Gallery</h3>
              <div className="space12" />
              <div className="row">
                <div className="col-lg-4 col-md-4 col-4">
                  <div className="img1">
                    <img src="/assets/img/all-images/footer/footer-img7.png" alt="" />
                    <div className="icons">
                      <a href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-4">
                  <div className="img1">
                    <img src="/assets/img/all-images/footer/footer-img8.png" alt="" />
                    <div className="icons">
                      <a href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-4">
                  <div className="img1">
                    <img src="/assets/img/all-images/footer/footer-img9.png" alt="" />
                    <div className="icons">
                      <a href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-4">
                  <div className="img1">
                    <img src="/assets/img/all-images/footer/footer-img10.png" alt="" />
                    <div className="icons">
                      <a href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-4">
                  <div className="img1">
                    <img src="/assets/img/all-images/footer/footer-img11.png" alt="" />
                    <div className="icons">
                      <a href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-4">
                  <div className="img1">
                    <img src="/assets/img/all-images/footer/footer-img12.png" alt="" />
                    <div className="icons">
                      <a href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space60" />
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright">
              <p>© Copyright {new Date().getFullYear()} - DevBcn. All Right Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
