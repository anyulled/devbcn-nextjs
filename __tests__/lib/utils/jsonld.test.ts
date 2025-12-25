/**
 * JSON-LD Schema Generators Tests
 *
 * Unit tests for JSON-LD utility functions
 */

import type { Company, JobOffer } from "@/config/data/job-offers/types";
import type { EditionConfig } from "@/config/editions/types";
import type { Speaker, Talk } from "@/hooks/types";
import {
  generateBreadcrumbSchema,
  generateEducationEventSchema,
  generateEventSchema,
  generateItemListSchema,
  generateJobPostingSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  serializeJsonLd,
} from "@/lib/utils/jsonld";

describe("JSON-LD Schema Generators", () => {
  describe("generateOrganizationSchema", () => {
    it("should generate valid Organization schema", () => {
      const schema = generateOrganizationSchema();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Organization");
      expect(schema.name).toBe("DevBcn");
      expect(schema.url).toBe("https://www.devbcn.com");
      expect(schema.logo).toBe("https://www.devbcn.com/assets/img/logo/logo.png");
      expect(Array.isArray(schema.sameAs)).toBe(true);
    });
  });

  describe("generateEventSchema", () => {
    it("should generate valid Event schema", () => {
      const mockConfig: EditionConfig = {
        edition: "2026",
        title: "DevBcn 2026",
        email: "info@devbcn.com",
        venue: "World Trade Center Barcelona",
        trackNumber: 8,
        tracks: "Frontend, Backend, Cloud, AI, DevOps, Mobile, Data, Security",
        event: {
          startDay: new Date("2026-06-16"),
          endDay: new Date("2026-06-17"),
        },
        actionButtons: true,
        showCountdown: true,
        showInfoButtons: true,
        hideSpeakers: false,
        hideTalks: false,
        diversity: true,
        carrousel: { enabled: true },
        schedule: { enabled: true },
        jobOffers: { enabled: true },
        cfp: {
          startDay: new Date("2025-12-01"),
          endDay: new Date("2026-03-31"),
          link: "https://sessionize.com/devbcn2026",
        },
        tickets: {
          startDay: new Date("2026-01-01"),
          endDay: new Date("2026-06-17"),
          url: "https://tickets.devbcn.com",
        },
        sponsors: {
          startDate: new Date("2026-01-01"),
          endDate: new Date("2026-06-17"),
        },
        sponsorsData: {
          top: null,
          premium: null,
          regular: null,
          communities: null,
          basic: null,
          media_partners: null,
          supporters: null,
        },
        brochure: "https://devbcn.com/brochure.pdf",
        sessionizeUrl: "https://sessionize.com/api/v2/devbcn2026",
        openFeedbackId: "devbcn2026",
        socialLinks: {
          twitter: "https://twitter.com/dev_bcn",
          linkedin: "https://linkedin.com/company/devbcn",
        },
      };

      const schema = generateEventSchema(mockConfig, "2026");

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Event");
      expect(schema.name).toBe("DevBcn 2026 - Barcelona Developers Conference");
      expect(schema.startDate).toBe(mockConfig.event.startDay.toISOString());
      expect(schema.endDate).toBe(mockConfig.event.endDay.toISOString());
      expect(schema.eventStatus).toBe("https://schema.org/EventScheduled");
      expect(schema.eventAttendanceMode).toBe("https://schema.org/OfflineEventAttendanceMode");
      expect(schema.location).toBeDefined();
      expect(schema.organizer).toBeDefined();
    });
  });

  describe("generatePersonSchema", () => {
    it("should generate valid Person schema", () => {
      const mockSpeaker: Speaker = {
        id: "speaker-1",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        bio: "Software engineer with 10 years of experience",
        tagLine: "Senior Software Engineer",
        profilePicture: "https://example.com/john.jpg",
        sessions: [],
        isTopSpeaker: true,
        links: [
          { title: "LinkedIn", url: "https://linkedin.com/in/johndoe", linkType: "LinkedIn" },
          { title: "Twitter", url: "https://twitter.com/johndoe", linkType: "Twitter" },
        ],
        questionAnswers: [],
        categories: [],
      };

      const schema = generatePersonSchema(mockSpeaker, "2026");

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Person");
      expect(schema.name).toBe("John Doe");
      expect(schema.jobTitle).toBe("Senior Software Engineer");
      expect(schema.description).toBe("Software engineer with 10 years of experience");
      expect(schema.image).toBe("https://example.com/john.jpg");
      expect(schema.url).toBe("https://www.devbcn.com/2026/speakers/speaker-1");
      expect(Array.isArray(schema.sameAs)).toBe(true);
    });
  });

  describe("generateEducationEventSchema", () => {
    it("should generate valid EducationEvent schema", () => {
      const mockTalk: Talk = {
        id: "talk-1",
        title: "Introduction to TypeScript",
        description: "Learn the basics of TypeScript",
        startsAt: "2026-06-16T10:00:00Z",
        endsAt: "2026-06-16T11:00:00Z",
        isServiceSession: false,
        isPlenumSession: false,
        speakers: [{ id: "speaker-1", name: "John Doe" }],
        categories: [],
        roomId: 1,
        room: "Room A",
        liveUrl: null,
        recordingUrl: null,
        status: "Accepted",
        isInformed: true,
        isConfirmed: true,
        questionAnswers: [],
      };

      const schema = generateEducationEventSchema(mockTalk, "2026", "World Trade Center Barcelona");

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("EducationEvent");
      expect(schema.name).toBe("Introduction to TypeScript");
      expect(schema.description).toBe("Learn the basics of TypeScript");
      expect(schema.startDate).toBe("2026-06-16T10:00:00Z");
      expect(schema.endDate).toBe("2026-06-16T11:00:00Z");
      expect(schema.location).toBeDefined();
      expect(Array.isArray(schema.performer)).toBe(true);
    });
  });

  describe("generateJobPostingSchema", () => {
    it("should generate valid JobPosting schema", () => {
      const mockJobOffer: JobOffer = {
        id: "job-1",
        title: "Senior Frontend Developer",
        url: "https://company.com/jobs/senior-frontend",
        location: "Barcelona, Spain",
        text: "We are looking for a senior frontend developer...",
      };

      const mockCompany: Company = {
        id: "company-1",
        name: "Tech Company",
        logo: "https://company.com/logo.png",
        description: "Leading tech company",
        url: "https://company.com",
        linkedin: "https://linkedin.com/company/techcompany",
        offers: [mockJobOffer],
      };

      const schema = generateJobPostingSchema(mockJobOffer, mockCompany, "2026");

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("JobPosting");
      expect(schema.title).toBe("Senior Frontend Developer");
      expect(schema.description).toBe("We are looking for a senior frontend developer...");
      expect(schema.jobLocation).toBeDefined();
      expect(schema.hiringOrganization).toBeDefined();
    });
  });

  describe("generateItemListSchema", () => {
    it("should generate valid ItemList schema", () => {
      const items = [
        { name: "Item 1", url: "https://example.com/item1", description: "First item" },
        { name: "Item 2", url: "https://example.com/item2", description: "Second item" },
      ];

      const schema = generateItemListSchema(items, "Test List");

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("ItemList");
      expect(schema.name).toBe("Test List");
      expect(schema.numberOfItems).toBe(2);
      expect(Array.isArray(schema.itemListElement)).toBe(true);
      expect(schema.itemListElement).toHaveLength(2);
    });
  });

  describe("generateBreadcrumbSchema", () => {
    it("should generate valid BreadcrumbList schema", () => {
      const breadcrumbs = [
        { name: "Home", url: "https://example.com" },
        { name: "Talks", url: "https://example.com/talks" },
        { name: "Talk Detail", url: "https://example.com/talks/1" },
      ];

      const schema = generateBreadcrumbSchema(breadcrumbs);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(Array.isArray(schema.itemListElement)).toBe(true);
      expect(schema.itemListElement).toHaveLength(3);
    });
  });

  describe("serializeJsonLd", () => {
    it("should serialize JSON-LD data to string", () => {
      const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test",
      };

      const serialized = serializeJsonLd(data);

      expect(typeof serialized).toBe("string");
      expect(JSON.parse(serialized)).toEqual(data);
    });

    it("should serialize array of JSON-LD data", () => {
      const data = [
        { "@context": "https://schema.org", "@type": "Person", name: "John" },
        { "@context": "https://schema.org", "@type": "Person", name: "Jane" },
      ];

      const serialized = serializeJsonLd(data);

      expect(typeof serialized).toBe("string");
      expect(JSON.parse(serialized)).toEqual(data);
    });
  });
});
