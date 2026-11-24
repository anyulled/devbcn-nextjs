"use client";
import { EditionNavigation } from "@/config/editions/types";
import { getEditionConfig, getEditionYearFromPathname } from "@/config/editions";
import { editionLinks } from "@/config/navigation";
import { trackTicketClick } from "@/lib/shared/analytics";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
  scroll: boolean;
  isSearch: boolean;
  handleSearch: () => void;
  navigation: EditionNavigation;
}

export default function Header8({ scroll, navigation }: Readonly<HeaderProps>) {
  const yearFromPath = getEditionYearFromPathname(usePathname());
  const isUpcomingEdition = yearFromPath === "2027";
  const edition = getEditionConfig(yearFromPath);
  const ticketUrl = edition.tickets.url;

  return (
    <header>
      <div className={`header-area homepage8 header header-sticky d-none d-lg-block ${scroll ? "sticky" : ""}`} id="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {!isUpcomingEdition && (
                <div className="menu-top-area">
                  <div className="top-menu-area">
                    <p>
                      Are you Ready to DevBcn?
                      <Link href={ticketUrl} onClick={() => trackTicketClick("header_top", yearFromPath)}>
                        Buy Ticket
                      </Link>
                    </p>
                    <ul>
                      <li>
                        <a href={`mailto:${edition.email}`}>
                          <Image src="/assets/img/icons/mail1.svg" alt="" width={16} height={16} />
                          {edition.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <div className="header-elements">
                <div className="site-logo">
                  <Link href="/">
                    <Image src="/assets/img/logo/devBcn.webp" alt="devBcn" width={96} height={49} style={{ width: "auto", height: "auto" }} />
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
                    {navigation.main.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                    {navigation.yearSpecific.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/#">
                        +Info <i className="fa-solid fa-angle-down" />
                      </Link>
                      <ul className="dropdown-padding">
                        {navigation.news.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
                {!isUpcomingEdition && (
                  <div className="btn-area">
                    <div className="btn-area1">
                      <Link className="vl-btn8" href={ticketUrl} onClick={() => trackTicketClick("header_button", yearFromPath)}>
                        <span className="demo">Buy Ticket</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
