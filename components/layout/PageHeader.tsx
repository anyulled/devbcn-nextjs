import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  /** The main heading text displayed in the header */
  title: string;
  /** The breadcrumb text shown after "Home >" */
  breadcrumbText: string;
  /** Background image number (1-13), defaults to 6 */
  backgroundImageId?: number;
  /** Bootstrap column class for the content container, defaults to "col-lg-5" */
  contentColClass?: string;
}

/**
 * Reusable page header component with title, breadcrumb, and optimized background image
 *
 * @example
 * <PageHeader title="Talks 2026" breadcrumbText="Talks" backgroundImageId={6} />
 */
export default function PageHeader({ title, breadcrumbText, backgroundImageId = 6, contentColClass = "col-lg-5" }: PageHeaderProps) {
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
