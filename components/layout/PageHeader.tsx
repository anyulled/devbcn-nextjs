import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  breadcrumbText: string;
  backgroundImageId?: number;
  contentColClass?: string;
}

/**
 * Reusable page header component with title, breadcrumb, and optimized background image
 *
 * @example
 * <PageHeader title="Talks 2026" breadcrumbText="Talks" backgroundImageId={6} />
 */
export default function PageHeader({ title, breadcrumbText, backgroundImageId = 6, contentColClass = "col-lg-10" }: Readonly<PageHeaderProps>) {
  return (
    <div className="inner-page-header" style={{ position: "relative" }}>
      <Image src={`/assets/img/bg/header-bg${backgroundImageId}.png`} alt="Background" fill priority style={{ objectFit: "cover", zIndex: -1 }} />
      <div className="container">
        <div className="row">
          <div className={`${contentColClass} m-auto`}>
            <div className="heading1 text-center">
              <h1>{title}</h1>
              <div className="space20" />
              <Link href="/">
                Home <i className="fa-solid fa-angle-right" /> <span>{breadcrumbText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
