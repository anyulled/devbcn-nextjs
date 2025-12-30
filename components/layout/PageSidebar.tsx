import Link from "next/link";

interface PageSidebarProps {
  year: string;
}

export default function PageSidebar({ year }: PageSidebarProps) {
  return (
    <div className="blog-auhtor-details">
      <div className="blog-categories">
        <h3>Quick Links</h3>
        <div className="space12" />
        <ul>
          <li>
            <Link href="/code-of-conduct">
              Code of Conduct{" "}
              <span>
                <i className="fa-solid fa-angle-right" />
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about-us">
              About Us{" "}
              <span>
                <i className="fa-solid fa-angle-right" />
              </span>
            </Link>
          </li>
          <li>
            <Link href={`/${year}/travel`}>
              Travel{" "}
              <span>
                <i className="fa-solid fa-angle-right" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="space32" />
      <div className="tags-area">
        <h3>Related Topics</h3>
        <div className="space12" />
        <ul>
          <li>
            <Link href="#">#Diversity</Link>
          </li>
          <li>
            <Link href="#">#Inclusion</Link>
          </li>
          <li>
            <Link href="#">#Community</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="#">#DevBcn{year}</Link>
          </li>
          <li>
            <Link href="#">#Sponsorship</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
