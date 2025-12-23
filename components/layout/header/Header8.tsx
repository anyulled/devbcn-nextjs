"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header9({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const yearFromPath = segments[0] && /^\d{4}$/.test(segments[0]) ? segments[0] : new Date().getFullYear().toString();

  const withYear = (slug: string) => `/${yearFromPath}${slug}`;
  console.log("=== Header 8");
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
                    <Link href="https://tickets.devbcn.com/event/devbcn-2026">Buy Ticket</Link>
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
                        <li>
                          <Link href="/2025">2025 Edition</Link>
                        </li>
                        <li>
                          <Link href="/2024">2024 Edition</Link>
                        </li>
                        <li>
                          <Link href="/2023">2023 Edition</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/code-of-conduct">Code of Conduct</Link>
                    </li>
                    <li>
                      <Link href="#sponsors">Sponsors</Link>
                    </li>
                    <li>
                      <Link href={withYear("/speakers")}>Speakers</Link>
                    </li>
                    <li>
                      <Link href={withYear("/schedule")}>Schedule</Link>
                    </li>
                    <li>
                      <Link href={withYear("/talks")}>Talks</Link>
                    </li>
                    <li>
                      <Link href="/#">
                        News <i className="fa-solid fa-angle-down" />
                      </Link>
                      <ul className="dropdown-padding">
                        <li>
                          <Link href={withYear("/cfp")}>CFP</Link>
                        </li>
                        <li>
                          <Link href={withYear("/diversity")}>Diversity</Link>
                        </li>
                        <li>
                          <Link href={withYear("/job-offers")}>Job Offers</Link>
                        </li>
                        <li>
                          <Link href="/travel">Travel</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="btn-area">
                  <div className="btn-area1">
                    <Link className="vl-btn8" href="https://tickets.devbcn.com/event/devbcn-2026">
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
