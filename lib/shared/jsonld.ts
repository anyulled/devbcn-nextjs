/**
 * JSON-LD Schema Generators
 *
 * Utility functions to generate schema.org compliant JSON-LD structured data
 * for SEO optimization and rich results in search engines.
 *
 * Uses schema-dts for TypeScript type safety and autocomplete support.
 */

import type { EditionConfig } from "@/config/editions/types";
import type { Company, JobOffer } from "@/config/job-offers/job-offers/types";
import type { Speaker, Talk, TalkSpeaker } from "@/hooks/types";
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
export function generateEventSchema(config: EditionConfig, year: string, speakers: Speaker[]): WithContext<Event> {
  const baseUrl = "https://www.devbcn.com";

  const eventSpeakers = speakers.map((speaker) => mapSpeakerToPersonSchema(speaker, year, baseUrl));

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
      name: config.venue.name,
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
          lowPrice: Math.min(...config.tickets.categories.map((c) => Number.parseInt(c.price.replaceAll(/[^\d]/g, ""), 10))).toString(),
          highPrice: Math.max(...config.tickets.categories.map((c) => Number.parseInt(c.price.replaceAll(/[^\d]/g, ""), 10))).toString(),
          availability: "https://schema.org/InStock",
          validFrom: config.tickets.startDay.toISOString(),
          offers: config.tickets.categories.map((category) => ({
            "@type": "Offer",
            name: `${category.name} Ticket`,
            price: category.price.replaceAll(/[^\d]/g, ""),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: category.startDate.toISOString(),
            priceValidUntil: category.endDate.toISOString(),
            url: config.tickets.url,
          })),
        }
      : undefined,
    performer: eventSpeakers,
    url: `${baseUrl}/${year}`,
  };
}

/**
 * Shared helper to map speaker types to Person schema
 */
function mapSpeakerToPersonSchema(speaker: Speaker | TalkSpeaker, year: string, baseUrl: string): Person {
  const isFullSpeaker = "fullName" in speaker;
  const name = isFullSpeaker ? speaker.fullName : speaker.name;
  const id = speaker.id;

  const person: Person = {
    "@type": "Person",
    name,
    url: `${baseUrl}/${year}/speakers/${id}`,
  };

  if (isFullSpeaker) {
    const s = speaker;
    if (s.profilePicture) person.image = s.profilePicture;
    if (s.tagLine) person.jobTitle = s.tagLine;
    if (s.bio) person.description = s.bio;

    if (s.links) {
      const sameAs = s.links.flatMap((link) => (["LinkedIn", "Twitter", "Company_Website", "Blog"].includes(link.linkType) ? [link.url] : []));
      if (sameAs.length > 0) person.sameAs = sameAs;
    }
  }

  return person;
}

/**
 * Generate Person schema for a speaker
 */
export function generatePersonSchema(speaker: Speaker, year: string): WithContext<Person> {
  const baseUrl = "https://www.devbcn.com";
  const personSchema = mapSpeakerToPersonSchema(speaker, year, baseUrl);

  return Object.assign({ "@context": "https://schema.org" as const }, personSchema) as WithContext<Person>;
}

/**
 * Generate EducationEvent schema for a talk/session
 */
export function generateEducationEventSchema(talk: Talk, year: string, venue: { name: string; mapUrl: string }): WithContext<EducationEvent> {
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
      name: `${venue.name} - ${talk.room}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1ª planta Edif. Este, Moll de Barcelona, s/n",
        addressLocality: "Barcelona",
        postalCode: "08039",
        addressCountry: "ES",
      },
    },
    performer: talk.speakers.map((speaker) => mapSpeakerToPersonSchema(speaker, year, baseUrl)),
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
export function serializeJsonLd(
  data:
    | WithContext<Organization | Event | Person | EducationEvent | JobPosting | ItemList | BreadcrumbList>
    | Array<WithContext<Organization | Event | Person | EducationEvent | JobPosting | ItemList | BreadcrumbList>>
): string {
  return JSON.stringify(data, null, 0);
}
