import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import type { Metadata } from "next";
import Link from "next/link";

interface DiversityProps {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: DiversityProps): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Diversity Sponsorship - DevBcn ${year}`,
    description: `DevBcn ${year} diversity sponsorship program. Supporting underrepresented groups in tech. Apply for a free conference ticket.`,
    keywords: [`DevBcn ${year} diversity`, "diversity sponsorship", "inclusion", "underrepresented groups", "free tickets", "barcelona developer conference"],
    openGraph: {
      title: `DevBcn ${year} Diversity Sponsorship`,
      description: `Supporting diversity in tech. Apply for a free ticket to DevBcn ${year}.`,
      url: `https://www.devbcn.com/${year}/diversity`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `DevBcn ${year} Diversity`,
      description: `Apply for a free ticket. Supporting diversity in tech.`,
    },
  };
}

export default async function Diversity({ params }: DiversityProps) {
  const { year } = await params;
  const eventData = getEditionConfig(year);
  return (
    <div>
      <PageHeader title="Diversity Sponsorship" breadcrumbText="Diversity Sponsorship" backgroundImageId={14} />

      <div className="blog-details-section sp8">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-deatils-content heading2">
                <div className="space32" />
                <p>
                  DevBcn, its volunteers, and staff consider that understanding, respecting, valuing and promoting differences is an essential part of our core
                  values. Since we believe that everyone is unique, in our events we actively encourage collaborative environments where individuals can
                  confidently share their different ideas. We are also committed to embrace the rich diversity of our society and the world around us. People
                  who are diverse in nationality, age, race, ethnic origin, spiritual beliefs and practices, gender, gender identity, sexual orientation, work
                  and life status are critical for constant improvement and innovation in our profession.
                </p>
                <div className="space16" />
                <p>That's why we are running again the diversity sponsorship for DevBcn 2025 🎉</p>
                <div className="space16" />
                <p>We must thank NUBANK for making this possible!</p>
                <div className="space48" />
                <h3>Who can apply?</h3>
                <div className="space16" />
                <p>
                  We strongly encourage applications from women, people with disabilities, people of color, economically disadvantaged people, LGBTQ or any
                  other underrepresented group. In addition, the applicants must be 18 years of age or older and must be available to attend the main days of
                  the event.
                </p>
                <div className="space16" />
                <p>There are a limited amount of sponsorships 🔥 and will be awarded based on a combination of need and impact.</p>
                <div className="space48" />
                <h3>How can I apply?</h3>
                <div className="space16" />
                <p>To apply, please fill the application form introducing yourself and telling us about your expectations for the event.</p>
                <div className="space16" />
                <p>All applications' information will be kept confidential and used exclusively for this campaign.</p>
                <div className="space48" />
                <h3>How will I be notified?</h3>
                <div className="space16" />
                <p>Selected people will be notified via email at the contact provided.</p>
                <div className="space16" />
                <p>
                  They will receive a free ticket to the conference, which includes admission 🎫 to all talks during the event, and catering 🥘 during the two
                  days of the conference.
                </p>
                <div className="space48" />
                <h3>Terms and Conditions</h3>
                <div className="space16" />
                <p>All awarded attendees must:</p>
                <div className="space16" />
                <ul>
                  <li>Follow the conference Code of conduct</li>
                  <li>Find additional funding for transportation and accommodation. These costs are not included.</li>
                  <li>Agree to conference and ticket terms and conditions in case of being awarded with a ticket.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="space30 d-lg-none d-block" />
              <div className="blog-auhtor-details">
                <div className="blog-categories">
                  <h3>Quick Links</h3>
                  <div className="space12" />
                  <ul>
                    <li>
                      <Link href="/code-of-conduct">
                        Code of Conduct{" "}
                        <span>
                          <i className="fa-solid fa-angle-right" />
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-us">
                        About Us{" "}
                        <span>
                          <i className="fa-solid fa-angle-right" />
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        Contact{" "}
                        <span>
                          <i className="fa-solid fa-angle-right" />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space32" />
                <div className="tags-area">
                  <h3>Related Topics</h3>
                  <div className="space12" />
                  <ul>
                    <li>
                      <Link href="/#">#Diversity</Link>
                    </li>
                    <li>
                      <Link href="/#">#Inclusion</Link>
                    </li>
                    <li>
                      <Link href="/#">#Community</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link href="/#">#DevBcn2025</Link>
                    </li>
                    <li>
                      <Link href="/#">#Sponsorship</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection
        eventDate={formatEventDateRange(eventData.event.startDay, eventData.event.endDay)}
        eventLocation={eventData.venue}
        ticketUrl={eventData.tickets.url}
        showCountdown={eventData.showCountdown}
      />
    </div>
  );
}
