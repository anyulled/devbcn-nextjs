"use client";
import { getEditionConfig } from "@/config/editions";
import { editionLinks, mainNavLinks, newsDropdownLinks, socialLinks, yearSpecificNavLinks } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
  const [isAccordion, setIsAccordion] = useState<number | null>(null);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const yearFromPath = segments[0] && /^\d{4}$/.test(segments[0]) ? segments[0] : new Date().getFullYear().toString();
  const configData = getEditionConfig(yearFromPath);

  const withYear = (slug: string) => `/${yearFromPath}${slug}`;

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
            {mainNavLinks.map((link) => (
              <li key={link.href} className="hash-has-sub">
                <Link href={link.href} className="hash-nav">
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Year-specific Nav Links */}
            {yearSpecificNavLinks.map((link) => (
              <li key={link.href} className="hash-has-sub">
                <Link href={withYear(link.href)} className="hash-nav">
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Schedule (conditional) */}
            {configData.schedule.enabled && (
              <li className="hash-has-sub">
                <Link href={withYear("/schedule")} className="hash-nav">
                  Schedule
                </Link>
              </li>
            )}

            {/* News with submenu */}
            <li className={isAccordion === 2 ? "has-sub hash-has-sub active" : "has-sub hash-has-sub"}>
              <span className="submenu-button" onClick={() => handleAccordion(2)}>
                <em />
              </span>
              <a className="hash-nav">News</a>
              <ul className="sub-menu" style={{ display: isAccordion === 2 ? "block" : "none" }}>
                {newsDropdownLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.requiresYear ? withYear(link.href) : link.href}>{link.label}</Link>
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
