/**
 * JSON-LD Schema Generators
 *
 * Utility functions to generate schema.org compliant JSON-LD structured data
 * for SEO optimization and rich results in search engines.
 *
 * Uses schema-dts for TypeScript type safety and autocomplete support.
 */

import type { Company, JobOffer } from "@/config/data/job-offers/types";
import type { EditionConfig } from "@/config/editions/types";
import type { Speaker, Talk } from "@/hooks/types";
import type { BreadcrumbList, EducationEvent, Event, ItemList, JobPosting, Organization, Person, WithContext } from "schema-dts";

/**
 * Generate Organization schema for DevBcn
 */
export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DevBcn",
    url: "https://www.devbcn.com",
    logo: "https://www.devbcn.com/assets/img/logo/logo.png",
    sameAs: ["https://twitter.com/dev_bcn", "https://www.linkedin.com/company/devbcn", "https://github.com/dev-bcn"],
  };
}

/**
 * Generate Event schema for the conference
 */
export function generateEventSchema(config: EditionConfig, year: string): WithContext<Event> {
  const baseUrl = "https://www.devbcn.com";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `DevBcn ${year} - Barcelona Developers Conference`,
    description: `DevBcn ${year}, Barcelona's biggest developer conference. Explore cutting-edge talks, workshops, and networking opportunities.`,
    startDate: config.event.startDay.toISOString(),
    endDate: config.event.endDay.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: config.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1ª planta Edif. Este, Moll de Barcelona, s/n",
        addressLocality: "Barcelona",
        postalCode: "08039",
        addressCountry: "ES",
      },
    },
    image: `${baseUrl}/${year}/opengraph-image`,
    organizer: {
      "@type": "Organization",
      name: "DevBcn",
      url: baseUrl,
    },
    offers: config.tickets.url
      ? {
          "@type": "AggregateOffer",
          url: config.tickets.url,
          priceCurrency: "EUR",
          lowPrice: "300",
          highPrice: "800",
          availability: "https://schema.org/InStock",
          validFrom: config.tickets.startDay.toISOString(),
          offers: [
            {
              "@type": "Offer",
              name: "Blind Bird Ticket",
              price: "300",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2026-01-10T00:00:00.000Z",
              priceValidUntil: "2026-01-31T23:59:59.999Z",
              url: config.tickets.url,
            },
            {
              "@type": "Offer",
              name: "Early Bird Ticket",
              price: "370",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2026-02-01T00:00:00.000Z",
              priceValidUntil: "2026-02-28T23:59:59.999Z",
              url: config.tickets.url,
            },
            {
              "@type": "Offer",
              name: "Regular Ticket",
              price: "440",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2026-03-01T00:00:00.000Z",
              priceValidUntil: "2026-03-31T23:59:59.999Z",
              url: config.tickets.url,
            },
            {
              "@type": "Offer",
              name: "Late Ticket",
              price: "600",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2026-04-01T00:00:00.000Z",
              priceValidUntil: "2026-04-30T23:59:59.999Z",
              url: config.tickets.url,
            },
            {
              "@type": "Offer",
              name: "Last Minute Ticket",
              price: "700",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2026-05-01T00:00:00.000Z",
              priceValidUntil: "2026-05-31T23:59:59.999Z",
              url: config.tickets.url,
            },
            {
              "@type": "Offer",
              name: "Super Last Minute Ticket",
              price: "800",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2026-06-01T00:00:00.000Z",
              priceValidUntil: "2026-06-15T23:59:59.999Z",
              url: config.tickets.url,
            },
          ],
        }
      : undefined,
    url: `${baseUrl}/${year}`,
  };
}

/**
 * Generate Person schema for a speaker
 */
export function generatePersonSchema(speaker: Speaker, year: string): WithContext<Person> {
  const baseUrl = "https://www.devbcn.com";
  const sameAs = speaker.links.filter((link) => ["LinkedIn", "Twitter", "Company_Website", "Blog"].includes(link.linkType)).map((link) => link.url);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: speaker.fullName,
    jobTitle: speaker.tagLine || undefined,
    description: speaker.bio || undefined,
    image: speaker.profilePicture || undefined,
    url: `${baseUrl}/${year}/speakers/${speaker.id}`,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

/**
 * Generate EducationEvent schema for a talk/session
 */
export function generateEducationEventSchema(talk: Talk, year: string, venue: string): WithContext<EducationEvent> {
  const baseUrl = "https://www.devbcn.com";

  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: talk.title,
    description: talk.description || undefined,
    startDate: talk.startsAt,
    endDate: talk.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: `${venue} - ${talk.room}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1ª planta Edif. Este, Moll de Barcelona, s/n",
        addressLocality: "Barcelona",
        postalCode: "08039",
        addressCountry: "ES",
      },
    },
    performer: talk.speakers.map((speaker) => ({
      "@type": "Person",
      name: speaker.name,
    })),
    organizer: {
      "@type": "Organization",
      name: "DevBcn",
      url: baseUrl,
    },
    url: `${baseUrl}/${year}/talks/${talk.id}`,
    recordedIn: talk.recordingUrl
      ? {
          "@type": "VideoObject",
          url: talk.recordingUrl,
        }
      : undefined,
  };
}

/**
 * Generate JobPosting schema for a job offer
 */
export function generateJobPostingSchema(jobOffer: JobOffer, company: Company, year: string): WithContext<JobPosting> {
  const baseUrl = "https://www.devbcn.com";

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: jobOffer.title,
    description: jobOffer.text,
    datePosted: new Date().toISOString(),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: jobOffer.location,
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: company.name,
      sameAs: company.url || undefined,
      logo: company.logo,
    },
    url: jobOffer.url || `${baseUrl}/${year}/job-offers`,
  };
}

/**
 * Generate ItemList schema for listing pages
 */
export function generateItemListSchema(items: Array<{ name: string; url: string; description?: string }>, listName: string): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description || undefined,
    })),
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Helper to serialize JSON-LD for embedding in HTML
 */
export function serializeJsonLd(data: WithContext<unknown> | Array<WithContext<unknown>>): string {
  return JSON.stringify(data, null, 0);
}
