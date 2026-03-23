import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { getAvailableEditions, getEditionConfig } from "@/config/editions";
import { isValidEditionYear } from "@/config/editions/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;
  if (!isValidEditionYear(year)) {
    return {};
  }
  const config = getEditionConfig(year);
  return {
    title: `Pricing Plan - ${config.title}`,
    description: `Ticket pricing and packages for DevBcn ${year}. Secure your spot for Barcelona's premier developer conference.`,
  };
}

export default async function PricingPlan({ params }: Readonly<PageProps>) {
  const { year } = await params;
  if (!isValidEditionYear(year)) {
    notFound();
  }

  const config = getEditionConfig(year);
  const categories = config.tickets.categories;

  return (
    <div>
      <PageHeader title="Pricing Plan" breadcrumbText="Pricing Plan" backgroundImageId={16} contentColClass="col-lg-9" />

      <div className="pricing-lan-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 m-auto">
              <div className="heading2 text-center space-margin60">
                <h5>ticket pricing</h5>
                <div className="space18" />
                <h2>Event Pass &amp; Tickets</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {categories.map((cat, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={cat.name} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="pricing-boxarea h-100 d-flex flex-column">
                  <h5>{cat.name}</h5>
                  <div className="space20" />
                  <h2>{cat.price}</h2>
                  <div className="space8" />
                  <p className="validity-dates" style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                    Valid: {cat.startDate.toLocaleDateString("en-GB")} - {cat.endDate.toLocaleDateString("en-GB")}
                  </p>
                  <ul>
                    <li>
                      <Image src="/assets/img/icons/check2.svg" alt="Checkmark icon" width={24} height={24} />
                      career grow opportunities
                    </li>
                    <li>
                      <Image src="/assets/img/icons/check2.svg" alt="Checkmark icon" width={24} height={24} />
                      Networking with top speakers
                    </li>
                    <li>
                      <Image src="/assets/img/icons/check2.svg" alt="Checkmark icon" width={24} height={24} />
                      Incredible swag from sponsoring companies
                    </li>
                    <li>
                      <Image src="/assets/img/icons/check2.svg" alt="Checkmark icon" width={24} height={24} />
                      Summer in Barcelona
                    </li>
                    <li>
                      <Image src="/assets/img/icons/check2.svg" alt="Checkmark icon" width={24} height={24} />
                      Top class well-located venue
                    </li>
                  </ul>
                  <div className="space28" />
                  <div className="btn-area1 mt-auto pt-4">
                    <Link href={config.tickets.url} target="_blank" rel="noopener noreferrer" className="vl-btn1">
                      buy a ticket
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection
        ticketUrl={config.tickets.url}
        eventStartDate={config.event.startDay}
        eventEndDate={config.event.endDay}
        eventLocation={config.venue}
        showCountdown={config.showCountdown}
      />
    </div>
  );
}
