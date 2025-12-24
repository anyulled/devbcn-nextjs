/**
 * Job Offers Data Types
 *
 * Type definitions for job offers and companies.
 */

export interface JobOffer {
  id: string;
  title: string;
  url?: string;
  location: string;
  text: string; // Markdown format
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  url?: string;
  linkedin?: string;
  twitter?: string;
  offers: JobOffer[];
}
