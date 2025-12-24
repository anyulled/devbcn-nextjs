import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { getJobOffersByYear } from "@/config/data/job-offers";
import { slugify } from "@/lib/utils/slugify";
import Image from "next/image";
import Link from "next/link";

interface JobOffersPageProps {
  params: Promise<{ year: string }>;
}

export default async function JobOffers({ params }: JobOffersPageProps) {
  const { year } = await params;
  const companies = getJobOffersByYear(year);

  return (
    <div>
      <PageHeader title="Job Offers" backgroundImageId={9} breadcrumbText="Job Offers" />

      <div className="job-offers-section sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="heading2 text-center space-margin60">
                <h2>Job Opportunities {year}</h2>
                {companies.length > 0 ? (
                  <p className="mt-3">Explore career opportunities with our partner companies. Click on a company to see their available positions.</p>
                ) : (
                  <p className="mt-3">No job offers are currently available for this year.</p>
                )}
              </div>
            </div>
          </div>

          {companies.length > 0 && (
            <div className="row g-4">
              {companies.map((company) => {
                const companySlug = slugify(company.name);
                const jobCount = company.offers.length;

                return (
                  <div key={company.id} className="col-lg-4 col-md-6">
                    <Link href={`/${year}/job-offers/${companySlug}`} className="text-decoration-none text-body d-block h-100">
                      <div className="border rounded p-4 h-100 d-flex flex-column bg-white transition-all hover-shadow">
                        <div className="d-flex align-items-center justify-content-center mb-4" style={{ height: "100px" }}>
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            width={200}
                            height={100}
                            className="w-100 h-100"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="flex-fill d-flex flex-column">
                          <h4 className="fs-5 fw-semibold mb-2">{company.name}</h4>
                          <p className="text-primary fw-medium mb-3 small">
                            {jobCount} {jobCount === 1 ? "position" : "positions"} available
                          </p>
                          <p className="text-muted small lh-base mb-0">{company.description.substring(0, 150)}...</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
