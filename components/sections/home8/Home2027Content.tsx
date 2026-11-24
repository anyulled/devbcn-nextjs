import ScrollHeading2027 from "./ScrollHeading2027";
import LazyBrandSlider from "@/components/slider/LazyBrandSlider";
import { cfpData2027 } from "@/config/cfp/cfpData2027";
import { edition2027 } from "@/config/editions/2027";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section2027Tickets from "./section2027-tickets";
import { SponsorGroup } from "./SponsorGroup";

const editionPath = `/${edition2027.edition}`;

const experiences = [
  {
    title: "AMA Sessions",
    description: "Keep the conversation going after a talk. Ask a speaker your questions in a one-hour session with up to six attendees.",
    path: "ama",
    photo: "/assets/img/features/ama-session-discussion.jpg",
    alt: "A small group in conversation around a table at DevBcn",
  },
  {
    title: "Speaking Mentoring",
    description: "Bring a talk idea or an abstract. Get practical feedback in a small group, whether you’re preparing your first talk or your next one.",
    path: "mentoring",
    photo: "/assets/img/features/speaking-mentoring-session.jpg",
    alt: "Attendees work on speaking and talk proposals together",
  },
];

export default function Home2027Content() {
  const { venue, email, socialLinks, sponsorsData } = edition2027;
  const sponsorTiers = [
    { title: "Top", items: sponsorsData.top },
    { title: "Premium", items: sponsorsData.premium },
    { title: "Regular", items: sponsorsData.regular },
    { title: "Basic", items: sponsorsData.basic },
    { title: "Communities", items: sponsorsData.communities },
    { title: "Media Partners", items: sponsorsData.media_partners },
    { title: "Supporters", items: sponsorsData.supporters },
  ];
  const hasEditionSponsors = sponsorTiers.some(({ items }) => Boolean(items?.length));

  return (
    <>
      <section id="experience" aria-labelledby="experience-title" className="home-2027__section">
        <div className="home-2027__inner">
          <div className="home-2027__intro">
            <ScrollHeading2027 id="experience-title">Meet the people behind the talks.</ScrollHeading2027>
            <p>
              Spend two days with developers across five tracks. Compare what works in practice, take your questions to a speaker, or get feedback on a talk of
              your own.
            </p>
          </div>
          <div className="home-2027__experiences">
            {experiences.map(({ title, description, path, photo, alt }) => (
              <article key={path} className="home-2027__experience">
                <div className={path === "mentoring" ? "home-2027__photo home-2027__photo--mentoring" : "home-2027__photo"}>
                  <Image src={photo} alt={alt} fill sizes="(max-width: 767px) 95vw, (max-width: 1280px) 48vw, 600px" />
                </div>
                <div className="home-2027__experience-copy">
                  <h3>
                    <Link href={`${editionPath}/${path}`}>
                      {title}
                      <ArrowDownRight aria-hidden="true" />
                    </Link>
                  </h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="tracks-title" className="home-2027__section home-2027__tracks">
        <div className="home-2027__inner">
          <ScrollHeading2027 id="tracks-title">Conference tracks</ScrollHeading2027>
          <ul>
            {cfpData2027.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="venue-title" className="home-2027__section">
        <div className="home-2027__inner home-2027__venue">
          <div className="home-2027__photo home-2027__venue-photo">
            <Image
              src="/assets/img/all-images/venue/wtc.webp"
              alt="Aerial view of World Trade Center Barcelona on the waterfront"
              fill
              sizes="(max-width: 767px) 95vw, (max-width: 1280px) 53vw, 660px"
            />
          </div>
          <div>
            <ScrollHeading2027 id="venue-title">{venue.name}</ScrollHeading2027>
            <p>Join us at the World Trade Center on Barcelona’s waterfront. The travel guide covers public transport, parking, and directions.</p>
            <Link href={`${editionPath}/travel`} className="home-2027__text-link">
              Plan your visit <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Section2027Tickets />

      <section id="sponsors" aria-labelledby="sponsors-title" className="home-2027__section home-2027__sponsors">
        <div className="home-2027__inner">
          <div className="home-2027__intro">
            <ScrollHeading2027 id="sponsors-title">Sponsors</ScrollHeading2027>
            <div>
              <p>Meet the developers who build and run the software their teams rely on.</p>
              <Link href={`${editionPath}/sponsorship`} className="home-2027__text-link">
                Explore sponsorship <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          {hasEditionSponsors ? (
            sponsorTiers.map(({ title, items }) => <SponsorGroup key={title} title={title} items={items} sizeClass="col-lg-3 col-md-4 col-6" />)
          ) : (
            <div className="home-2027__past-sponsors">
              <h3>Past sponsors</h3>
              <LazyBrandSlider />
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="faq-title" className="home-2027__section">
        <div className="home-2027__inner home-2027__faq">
          <ScrollHeading2027 id="faq-title">Before you go</ScrollHeading2027>
          <div>
            <details>
              <summary>Can I get help with my employer’s approval?</summary>
              <p>
                Use our <Link href={`${editionPath}/convince-your-boss`}>Convince your Boss</Link> template to explain what you’ll learn and bring back to your
                team.
              </p>
            </details>
            <details>
              <summary>Can I watch talks from previous editions?</summary>
              <p>
                Find recordings on <a href={socialLinks.youtube}>DevBcn’s YouTube channel</a>.
              </p>
            </details>
            <details>
              <summary>Who can I contact with a question?</summary>
              <p>
                Email the organizers at <a href={`mailto:${email}`}>{email}</a>.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
