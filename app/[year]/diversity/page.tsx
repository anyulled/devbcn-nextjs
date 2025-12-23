import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import Link from "next/link";

interface DiversityProps {
  params: Promise<{ year: string }>;
}

export default async function Diversity({ params }: DiversityProps) {
  const { year } = await params;
  const eventData = getEditionConfig(year);
  return (<div>
    {/*===== HERO AREA ENDS =======*/}
    <div
      className="inner-page-header"
      style={{ backgroundImage: "url(/assets/img/bg/header-bg14.png)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="heading1 text-center">
              <h1>Diversity Sponsorship</h1>
              <div className="space20" />
              <Link href="/">
                Home <i className="fa-solid fa-angle-right" />{" "}
                <span>Diversity Sponsorship</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*===== DIVERSITY CONTENT AREA STARTS =======*/}
    <div className="blog-details-section sp8">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-deatils-content heading2">
              <div className="space32" />
              <p>
                DevBcn, its volunteers, and staff consider that understanding,
                respecting, valuing and promoting differences is an essential part of
                our core values. Since we believe that everyone is unique, in our events
                we actively encourage collaborative environments where individuals can
                confidently share their different ideas. We are also committed to
                embrace the rich diversity of our society and the world around us.
                People who are diverse in nationality, age, race, ethnic origin,
                spiritual beliefs and practices, gender, gender identity, sexual
                orientation, work and life status are critical for constant improvement
                and innovation in our profession.
              </p>
              <div className="space16" />
              <p>
                That's why we are running again the diversity sponsorship for DevBcn
                2025 🎉
              </p>
              <div className="space16" />
              <p>We must thank NUBANK for making this possible!</p>
              <div className="space48" />
              <h3>Who can apply?</h3>
              <div className="space16" />
              <p>
                We strongly encourage applications from women, people with disabilities,
                people of color, economically disadvantaged people, LGBTQ or any other
                underrepresented group. In addition, the applicants must be 18 years of
                age or older and must be available to attend the main days of the event.
              </p>
              <div className="space16" />
              <p>
                There are a limited amount of sponsorships 🔥 and will be awarded based
                on a combination of need and impact.
              </p>
              <div className="space48" />
              <h3>How can I apply?</h3>
              <div className="space16" />
              <p>
                To apply, please fill the application form introducing yourself and
                telling us about your expectations for the event.
              </p>
              <div className="space16" />
              <p>
                All applications' information will be kept confidential and used
                exclusively for this campaign.
              </p>
              <div className="space48" />
              <h3>How will I be notified?</h3>
              <div className="space16" />
              <p>Selected people will be notified via email at the contact provided.</p>
              <div className="space16" />
              <p>
                They will receive a free ticket to the conference, which includes
                admission 🎫 to all talks during the event, and catering 🥘 during the
                two days of the conference.
              </p>
              <div className="space48" />
              <h3>Terms and Conditions</h3>
              <div className="space16" />
              <p>All awarded attendees must:</p>
              <div className="space16" />
              <ul>
                <li>Follow the conference Code of conduct</li>
                <li>
                  Find additional funding for transportation and accommodation. These
                  costs are not included.
                </li>
                <li>
                  Agree to conference and ticket terms and conditions in case of being
                  awarded with a ticket.
                </li>
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
    {/*===== DIVERSITY CONTENT AREA ENDS =======*/}
    <CTASection eventDate={formatEventDateRange(eventData.event.startDay, eventData.event.endDay)} eventLocation={eventData.venue} ticketUrl={eventData.tickets.url} />
  </div>
  );
}
