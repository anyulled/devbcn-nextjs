import JobOffersAccordion from "@/components/job-offers/JobOffersAccordion";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { findCompanyBySlug } from "@/config/data/job-offers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CompanyJobOffersPageProps {
  params: Promise<{ year: string; "company-name": string }>;
}

export default async function CompanyJobOffers({ params }: CompanyJobOffersPageProps) {
  const { year, "company-name": companySlug } = await params;
  const company = findCompanyBySlug(year, companySlug);

  if (!company) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={`${company.name} - Job Offers`} backgroundImageId={9} breadcrumbText={company.name} />

      <div className="company-detail-section sp1">
        <div className="container">
          {/* Company Header */}
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="text-center pb-4 border-bottom border-2">
                <div className="d-flex justify-content-center align-items-center mb-4" style={{ minHeight: "125px" }}>
                  <Image src={company.logo} alt={`${company.name} logo`} width={250} height={125} style={{ objectFit: "contain" }} />
                </div>
                <h2 className="display-5 fw-bold mb-4">{company.name}</h2>
                <p className="fs-5 lh-lg text-muted mb-4 mx-auto" style={{ maxWidth: "800px" }}>
                  {company.description}
                </p>

                {/* Social Links */}
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  {company.url && (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary d-inline-flex align-items-center gap-2 px-3 py-2"
                    >
                      <i className="fa-solid fa-globe" /> Website
                    </a>
                  )}
                  {company.linkedin && (
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary d-inline-flex align-items-center gap-2 px-3 py-2"
                    >
                      <i className="fa-brands fa-linkedin" /> LinkedIn
                    </a>
                  )}
                  {company.twitter && (
                    <a
                      href={company.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary d-inline-flex align-items-center gap-2 px-3 py-2"
                    >
                      <i className="fa-brands fa-twitter" /> Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Job Offers Section */}
          <div className="row mt-5">
            <div className="col-lg-10 m-auto">
              <div className="heading2 text-center space-margin60">
                <h3>Open Positions</h3>
                <p className="mt-3">
                  {company.offers.length} {company.offers.length === 1 ? "position" : "positions"} available
                </p>
              </div>

              <JobOffersAccordion offers={company.offers} />

              <div className="text-center mt-5 pt-4">
                <Link href={`/${year}/job-offers`} className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
                  <i className="fa-solid fa-arrow-left" /> Back to All Companies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
