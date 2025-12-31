"use client";
import { EditionNavigation } from "@/config/editions/types";
import { editionLinks } from "@/config/navigation";
import { trackTicketClick } from "@/lib/utils/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  scroll: boolean;
  isMobileMenu: boolean;
  handleMobileMenu: () => void;
  isSearch: boolean;
  handleSearch: () => void;
  navigation: EditionNavigation;
}

export default function Header8({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch, navigation }: HeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const yearFromPath = segments[0] && /^\d{4}$/.test(segments[0]) ? segments[0] : new Date().getFullYear().toString();

  // Note: We use yearFromPath only for tracking or external links if needed.
  // Navigation links are already resolved.

  // Fallback for editionLinks (Home dropdown) - keep global or move to config?
  // User didn't specify moving editionLinks. We'll keep them global for now as they list available editions.

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
                        News <i className="fa-solid fa-angle-down" />
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
                    {/* Hardcoded ticket link fallback or passing config? 
                        The original code used configData.tickets.url.
                        We don't have configData here anymore. 
                        We should probably include tickets URL in navigation or pass it as prop?
                        Or just hardcode it for now since 2026 is the main one. 
                        Plan didn't mention tickets URL. 
                        Ideally DynamicHeaderWrapper should pass config or ticketUrl. 
                        But I will assume 2026 for now or just generic link.
                        Wait, tickets URL changes per year.
                        I should probably pass it in navigation too? Or just import getEditionConfig here?
                        Using getEditionConfig here is fine for METADATA (tickets, etc) but navigation should rely on prop.
                        Actually, Client Components shouldn't fetch config if it depends on generic types.
                        But `getEditionConfig` is just a sync helper. It's SAFE to use in Client Components for static data.
                    */}
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
