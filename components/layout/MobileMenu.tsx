"use client";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
  const [isAccordion, setIsAccordion] = useState(1);

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };
  return (
    <>
      <div className="mobile-header mobile-haeder1 d-block d-lg-none">
        <div className="container-fluid">
          <div className="col-12">
            <div className="mobile-header-elements">
              <div className="mobile-logo">
                <Link href="//">
                  <img src="/assets/img/logo/devBcn.webp" alt="devBcn" />
                </Link>
              </div>
              <div className="mobile-nav-icon dots-menu" onClick={handleMobileMenu}>
                <i className="fa-solid fa-bars-staggered" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mobile-sidebar mobile-sidebar1 ${isMobileMenu ? "mobile-menu-active" : ""}`}>
        <div className="logosicon-area">
          <div className="logos">
            <img src="/assets/img/logo/logo.png" alt="DevBcn" width={100} />
          </div>
          <div className="menu-close" onClick={handleMobileMenu}>
            <i className="fa-solid fa-xmark" />
          </div>
        </div>
        <div className="mobile-nav mobile-nav1">
          <ul className="mobile-nav-list nav-list1">
            <li className="has-sub hash-has-sub">
              <span className="hash-nav">
                <em />
              </span>
              <Link href="/#" className="hash-nav">
                Home{" "}
              </Link>
            </li>
            <li className="hash-has-sub">
              <Link href="/about-us" className="hash-nav">
                About Us
              </Link>
            </li>
            <li className="has-sub hash-has-sub">
              <span className="hash-nav">
                <em />
              </span>
              <Link href="/code-of-conduct" className="hash-nav">
                Code of Conduct
              </Link>
            </li>
            <li className="has-sub hash-has-sub">
              <span className="hash-nav">
                <em />
              </span>
              <Link href="/#sponsors" className="hash-nav">
                Sponsors
              </Link>
            </li>
            <li className="has-sub hash-has-sub">
              <span className="hash-nav">
                <em />
              </span>
              <Link href="/travel" className="hash-nav">
                Venue
              </Link>
            </li>
            <li className="has-sub hash-has-sub">
              <span className="hash-nav">
                <em />
              </span>
              <Link href="/sponsorship" className="hash-nav">
                Sponsorship
              </Link>
            </li>
          </ul>

          <div className="allmobilesection">
            <Link href="https://tickets.devbcn.com/event/devbcn-2026" className="vl-btn1">
              Reserve your spot
            </Link>
            <div className="single-footer">
              <h3>Contact Info</h3>
              <div className="footer1-contact-info">
                <div className="contact-info-single">
                  <div className="contact-info-icon">
                    <span>
                      <i className="fa-solid fa-envelope" />
                    </span>
                  </div>
                  <div className="contact-info-text">
                    <a href="mailto:info@devbcn.com">info@devbcn.com</a>
                  </div>
                </div>
                <div className="single-footer">
                  <h3>Venue</h3>
                  <div className="contact-info-single">
                    <div className="contact-info-icon">
                      <span>
                        <i className="fa-solid fa-location-dot" />
                      </span>
                    </div>
                    <div className="contact-info-text">
                      <a href="https://wtcbarcelona.com" target="_blank" rel="noopener noreferrer">
                        World Trade Center, Barcelona
                      </a>
                    </div>
                  </div>
                </div>
                <div className="single-footer">
                  <h3>Social Links</h3>
                  <div className="social-links-mobile-menu">
                    <ul>
                      <li>
                        <Link href="https://twitter.com/dev_bcn" target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-instagram" />
                        </Link>
                      </li>
                      <li>
                        <Link href="	https://www.linkedin.com/company/devbcn/" target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-linkedin-in" />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://bsky.app/profile/devbcn.bsky.social" target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-bluesky" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
