"use client";
import { EditionNavigation } from "@/config/editions/types";
import { editionLinks, socialLinks } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MobileMenuProps {
  isMobileMenu: boolean;
  handleMobileMenu: () => void;
  navigation: EditionNavigation;
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu, navigation }: MobileMenuProps) {
  const [isAccordion, setIsAccordion] = useState<number | null>(null);
  const pathname = usePathname();
  // yearFromPath logic is still useful for some things or we can remove if unused
  // But socialLinks might need context? No, socialLinks are global array.

  const handleAccordion = (key: number) => {
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
            {/* Home with Past Editions submenu */}
            <li className={isAccordion === 1 ? "has-sub hash-has-sub active" : "has-sub hash-has-sub"}>
              <span className="submenu-button" onClick={() => handleAccordion(1)}>
                <em />
              </span>
              <a className="hash-nav">Home</a>
              <ul className="sub-menu" style={{ display: isAccordion === 1 ? "block" : "none" }}>
                {editionLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Main Nav Links */}
            {navigation.main.map((link) => (
              <li key={link.href} className="hash-has-sub">
                <Link href={link.href} className="hash-nav">
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Year-specific Nav Links */}
            {navigation.yearSpecific.map((link) => (
              <li key={link.href} className="hash-has-sub">
                <Link href={link.href} className="hash-nav">
                  {link.label}
                </Link>
              </li>
            ))}

            {/* News with submenu */}
            <li className={isAccordion === 2 ? "has-sub hash-has-sub active" : "has-sub hash-has-sub"}>
              <span className="submenu-button" onClick={() => handleAccordion(2)}>
                <em />
              </span>
              <a className="hash-nav">News</a>
              <ul className="sub-menu" style={{ display: isAccordion === 2 ? "block" : "none" }}>
                {navigation.news.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
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
                      {socialLinks.map((social) => (
                        <li key={social.platform}>
                          <Link href={social.url} target="_blank" rel="noopener noreferrer">
                            <i className={social.icon} />
                          </Link>
                        </li>
                      ))}
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
