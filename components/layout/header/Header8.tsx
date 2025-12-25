"use client";
import { getEditionConfig } from "@/config/editions";
import { editionLinks, mainNavLinks, newsDropdownLinks, yearSpecificNavLinks } from "@/config/navigation";
import { trackTicketClick } from "@/lib/utils/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header9({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const yearFromPath = segments[0] && /^\d{4}$/.test(segments[0]) ? segments[0] : new Date().getFullYear().toString();
  const configData = getEditionConfig(yearFromPath);

  const withYear = (slug: string) => `/${yearFromPath}${slug}`;

  return (
    <header>
      <div className={`header-area homepage8 header header-sticky d-none d-lg-block ${scroll ? "sticky" : ""}`} id="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="menu-top-area">
                <div className="top-menu-area">
                  <p>
                    Are you Ready to DevBcn?
                    <Link href="https://tickets.devbcn.com/event/devbcn-2026" onClick={() => trackTicketClick("header_top", yearFromPath)}>
                      Buy Ticket
                    </Link>
                  </p>
                  <ul>
                    <li>
                      <Link href="/mailto:info@devbcn.com">
                        <img src="/assets/img/icons/mail1.svg" alt="" />
                        info@devbcn.com <span> | </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header-elements">
                <div className="site-logo">
                  <Link href="/">
                    <img src="/assets/img/logo/devBcn.webp" alt="devBcn" />
                  </Link>
                </div>
                <div className="main-menu">
                  <ul>
                    <li>
                      <Link href="/#">
                        Home <i className="fa-solid fa-angle-down" />
                      </Link>
                      <ul className="dropdown-padding">
                        {editionLinks.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {mainNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                    {yearSpecificNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={withYear(link.href)}>{link.label}</Link>
                      </li>
                    ))}
                    {configData.schedule.enabled && (
                      <li>
                        <Link href={withYear("/schedule")}>Schedule</Link>
                      </li>
                    )}
                    <li>
                      <Link href="/#">
                        News <i className="fa-solid fa-angle-down" />
                      </Link>
                      <ul className="dropdown-padding">
                        {newsDropdownLinks.map((link) => (
                          <li key={link.href}>
                            <Link href={link.requiresYear ? withYear(link.href) : link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="btn-area">
                  <div className="btn-area1">
                    <Link className="vl-btn8" href={configData.tickets.url} onClick={() => trackTicketClick("header_button", yearFromPath)}>
                      <span className="demo">Buy Ticket</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
