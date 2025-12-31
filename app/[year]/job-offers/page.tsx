import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { getJobOffersByYear } from "@/config/data/job-offers";
import { Company } from "@/config/data/job-offers/types";
import { getAvailableEditions, getEditionConfig } from "@/config/editions";
import { generateItemListSchema, serializeJsonLd } from "@/lib/utils/jsonld";
import { slugify } from "@/lib/utils/slugify";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// ISR: Revalidate every week to keep job offers data fresh
export const revalidate = 604800;

interface JobOffersPageProps {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: JobOffersPageProps): Promise<Metadata> {
  const { year } = await params;
  const companies = getJobOffersByYear(year);
  const companyCount = companies.length;

  return {
    title: `Job Opportunities - DevBcn ${year}`,
    description: `Explore career opportunities from ${companyCount} companies at DevBcn ${year}. Find your next role in tech.`,
    keywords: [`DevBcn ${year} jobs`, "tech jobs barcelona", "developer jobs", "software engineer jobs", "conference job fair"],
    openGraph: {
      title: `DevBcn ${year} Job Opportunities`,
      description: `${companyCount} companies hiring at DevBcn ${year}.`,
      url: `https://www.devbcn.com/${year}/job-offers`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `DevBcn ${year} Jobs`,
      description: `${companyCount} companies hiring. Find your next role.`,
    },
  };
}

function generateJsonLDSchema(companies: Company[], year: string) {
  const baseUrl = "https://www.devbcn.com";
  const companiesListSchema =
    companies.length > 0
      ? generateItemListSchema(
          companies.map((company) => ({
            name: company.name,
            url: `${baseUrl}/${year}/job-offers/${slugify(company.name)}`,
            description: company.description,
          })),
          `DevBcn ${year} Job Offers`
        )
      : null;
  return companiesListSchema;
}

export default async function JobOffers({ params }: JobOffersPageProps) {
  const { year } = await params;
  const companies = getJobOffersByYear(year);
  const eventData = getEditionConfig(year);

  // Generate JSON-LD ItemList schema for companies
  const companiesListSchema = generateJsonLDSchema(companies, year);

  return (
    <div>
      {companiesListSchema && (
        <Script id="job-offers-list-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(companiesListSchema) }} />
      )}
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

      <CTASection
        eventStartDate={eventData.event.startDay}
        eventEndDate={eventData.event.endDay}
        eventLocation={eventData.venue}
        ticketUrl={eventData.tickets.url}
        showCountdown={eventData.showCountdown}
      />
    </div>
  );
}
