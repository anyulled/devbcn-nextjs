import Link from "next/link";

interface PageHeaderProps {
    /** The main heading text displayed in the header */
    title: string;
    /** The breadcrumb text shown after "Home >" */
    breadcrumbText: string;
    /** Background image number (1-13), defaults to 6 */
    backgroundImageId?: number;
}

/**
 * Reusable page header component with title, breadcrumb, and background image
 *
 * @example
 * <PageHeader title="Talks 2026" breadcrumbText="Talks" backgroundImageId={6} />
 */
export default function PageHeader({
    title,
    breadcrumbText,
    backgroundImageId = 6,
}: PageHeaderProps) {
    return (
        <div
            className="inner-page-header"
            style={{
                backgroundImage: `url(/assets/img/bg/header-bg${backgroundImageId}.png)`,
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="heading1 text-center">
                            <h1>{title}</h1>
                            <div className="space20" />
                            <Link href="/">
                                Home <i className="fa-solid fa-angle-right" />{" "}
                                <span>{breadcrumbText}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
