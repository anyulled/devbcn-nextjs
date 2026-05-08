"use client";
import { EditionNavigation } from "@/config/editions/types";
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
  const pathname = usePathname();
  const segment = pathname?.split("/").find(Boolean);
  const yearFromPath = segment && /^\d{4}$/.test(segment) ? segment : new Date().getFullYear().toString();

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
                        <Image src="/assets/img/icons/mail1.svg" alt="" width={16} height={16} />
                        info@devbcn.com <span> | </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header-elements">
                <div className="site-logo">
                  <Link href="/">
                    <Image src="/assets/img/logo/devBcn.webp" alt="devBcn" width={96} height={49} style={{ width: "auto", height: "auto" }} priority />
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
                <div className="btn-area">
                  <div className="btn-area1">
                    <Link
                      className="vl-btn8"
                      href="https://tickets.devbcn.com/event/devbcn-2026"
                      onClick={() => trackTicketClick("header_button", yearFromPath)}
                    >
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
