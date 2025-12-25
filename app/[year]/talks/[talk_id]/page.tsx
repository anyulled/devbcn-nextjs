import AddToCalendarWrapper from "@/components/elements/AddToCalendarWrapper";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import { Speaker } from "@/hooks/types";
import {
  getLevelFromTalk,
  getLevelStars,
  getRandomRelatedTalksByTrack,
  getTagsFromTalk,
  getTalkByYearAndId,
  getTalks,
  getTalkSpeakersWithDetails,
  getTrackFromTalk,
} from "@/hooks/useTalks";
import { generateBreadcrumbSchema, generateEducationEventSchema, generatePersonSchema, serializeJsonLd } from "@/lib/utils/jsonld";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

// ISR: Revalidate every 6 hours to keep talk data fresh
export const revalidate = 21600;

interface TalkDetailProps {
  params: Promise<{
    year: string;
    talk_id: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  const params = [];

  for (const year of years) {
    try {
      const sessionGroups = await getTalks(year);
      const allTalks = sessionGroups.flatMap((group) => group.sessions);
      for (const talk of allTalks) {
        params.push({ year, talk_id: talk.id });
      }
    } catch (error) {
      console.warn(`Failed to fetch talks for year ${year}:`, error);
    }
  }

  return params;
}

export async function generateMetadata({ params }: TalkDetailProps): Promise<Metadata> {
  const { year, talk_id } = await params;
  const talk = await getTalkByYearAndId(year, talk_id);

  if (!talk) {
    return {
      title: "Talk Not Found",
      description: "The requested talk could not be found.",
    };
  }

  const track = getTrackFromTalk(talk);
  const level = getLevelFromTalk(talk);
  const speakerNames = talk.speakers.map((s) => s.name).join(", ");
  const descriptionPreview = talk.description.length > 150 ? `${talk.description.substring(0, 150)}...` : talk.description;

  return {
    title: `${talk.title} - DevBcn ${year}`,
    description: `${descriptionPreview} Track: ${track}. Level: ${level}. By ${speakerNames}.`,
    keywords: [talk.title, `DevBcn ${year}`, track, level, ...speakerNames.split(", "), "tech talk", "conference session", "barcelona developer conference"],
    openGraph: {
      title: `${talk.title} - DevBcn ${year}`,
      description: `${descriptionPreview} By ${speakerNames}`,
      url: `https://www.devbcn.com/${year}/talks/${talk_id}`,
      type: "article",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `${talk.title} - DevBcn ${year}`,
      description: `${descriptionPreview} By ${speakerNames}`,
    },
  };
}

const getSocialIcon = (linkType: string): string => {
  const iconMap: Record<string, string> = {
    Twitter: "fa-brands fa-twitter",
    LinkedIn: "fa-brands fa-linkedin-in",
    Facebook: "fa-brands fa-facebook-f",
    Instagram: "fa-brands fa-instagram",
    GitHub: "fa-brands fa-github",
    Blog: "fa-solid fa-blog",
    Company_Website: "fa-solid fa-building",
    Other: "fa-solid fa-link",
  };
  return iconMap[linkType] || "fa-solid fa-link";
};

const getIconClass = (index: number): string => {
  const classes = ["icon1", "icon2", "icon3", "icon4"];
  return classes[index % classes.length];
};

export default async function TalkDetail({ params }: TalkDetailProps) {
  const { year, talk_id } = await params;
  const talk = await getTalkByYearAndId(year, talk_id);
  const eventData = getEditionConfig(year);

  if (!talk) {
    notFound();
  }

  const speakerIds = talk.speakers.map((s) => s.id);
  const speakers = await getTalkSpeakersWithDetails(year, speakerIds);
  const track = getTrackFromTalk(talk);
  const relatedTalks = await getRandomRelatedTalksByTrack(year, track, talk.id, 3);

  // Get speakers for related talks
  const relatedTalksSpeakers: Map<string, Speaker[]> = new Map();
  for (const relatedTalk of relatedTalks) {
    const relSpeakerIds = relatedTalk.speakers.map((s) => s.id);
    const relSpeakers = await getTalkSpeakersWithDetails(year, relSpeakerIds);
    relatedTalksSpeakers.set(relatedTalk.id, relSpeakers);
  }

  const level = getLevelFromTalk(talk);
  const levelStars = getLevelStars(level);
  const tags = getTagsFromTalk(talk);
  const voteUrl = `https://openfeedback.io/${talk.id}`;

  // Format dates for display and calendar
  const startDate = talk.startsAt ? format(parseISO(talk.startsAt), "yyyy-MM-dd") : "";
  const startTime = talk.startsAt ? format(parseISO(talk.startsAt), "HH:mm") : "";
  const endDate = talk.endsAt ? format(parseISO(talk.endsAt), "yyyy-MM-dd") : "";
  const endTime = talk.endsAt ? format(parseISO(talk.endsAt), "HH:mm") : "";
  const startFormatted = talk.startsAt ? format(parseISO(talk.startsAt), "MMMM d, yyyy") : "";
  const timeFormatted = talk.startsAt && talk.endsAt ? `${format(parseISO(talk.startsAt), "h:mm a")} - ${format(parseISO(talk.endsAt), "h:mm a")}` : "";

  // WTC Barcelona coordinates for Google Maps
  const venueMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.8087698983287!2d2.1387861!3d41.3801893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2e31f1c0f87%3A0x55f6c7a5b8f5f5d9!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1703000000000!5m2!1sen!2ses";

  // Generate JSON-LD schemas
  const baseUrl = "https://www.devbcn.com";
  const educationEventSchema = generateEducationEventSchema(talk, year, eventData.venue);
  const speakerSchemas = speakers.map((speaker) => generatePersonSchema(speaker, year));
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `${baseUrl}/${year}` },
    { name: "Talks", url: `${baseUrl}/${year}/talks` },
    { name: talk.title, url: `${baseUrl}/${year}/talks/${talk.id}` },
  ]);

  return (
    <div>
      <Script id="talk-education-event-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(educationEventSchema) }} />
      {speakerSchemas.map((schema, idx) => (
        <Script
          key={`speaker-${idx}`}
          id={`talk-speaker-${idx}-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
      <Script id="talk-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      {/* Hero Header Section */}
      <PageHeader title={talk.title} backgroundImageId={9} breadcrumbText="Talks" />

      {/* Main Content Section - Two Column Layout */}
      <div className="event-sidepage-section-area sp8">
        <div className="container">
          <div className="row">
            {/* Left Column - Session Content */}
            <div className="col-lg-7">
              <div className="event-side-images">
                {/* Session Title */}
                <h3>{talk.title}</h3>
                <div className="space16" />

                {/* Session Description */}
                <p style={{ lineHeight: "1.8", whiteSpace: "pre-line" }}>{talk.description}</p>

                <div className="space24" />

                {/* Track */}
                <div style={{ marginBottom: "12px" }}>
                  <strong>
                    <img src="/assets/img/icons/tag1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                    Track:
                  </strong>{" "}
                  {track}
                </div>

                {/* Level */}
                {levelStars && (
                  <div style={{ marginBottom: "12px" }}>
                    <strong>Level:</strong> {levelStars} {level}
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <strong>Tags:</strong>
                    <div style={{ marginTop: "8px" }}>
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            display: "inline-block",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            color: "#fff",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            marginRight: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Room */}
                {talk.room && (
                  <div style={{ marginBottom: "24px" }}>
                    <strong>
                      <img src="/assets/img/icons/location1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                      Room:
                    </strong>{" "}
                    {talk.room}
                  </div>
                )}

                <div className="space40" />

                {/* Speakers Section */}
                <h4>Session Speakers</h4>
                <div className="row">
                  {speakers.map((speaker) => (
                    <div className="col-lg-4 col-md-6" key={speaker.id}>
                      <div className="our-team-boxarea">
                        <div className="team-widget-area">
                          <Image src="/assets/img/elements/elements25.png" alt="" className="elements21" width={100} height={100} />
                          <Image src="/assets/img/elements/elements26.png" alt="" className="elements22" width={100} height={100} />
                          <div className="img1">
                            <Image
                              src={speaker.profilePicture}
                              alt={speaker.fullName}
                              className="team-img4"
                              width={150}
                              height={150}
                              style={{ objectFit: "cover" }}
                            />
                            {speaker.links.length > 0 && (
                              <>
                                <div className="share">
                                  <Link href="#">
                                    <img src="/assets/img/icons/share1.svg" alt="" />
                                  </Link>
                                </div>
                                <ul>
                                  {speaker.links.slice(0, 4).map((link, idx) => (
                                    <li key={link.title}>
                                      <a href={link.url} className={getIconClass(idx)} target="_blank" rel="noopener noreferrer" title={link.title}>
                                        <i className={getSocialIcon(link.linkType)} />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="space28" />
                        <div className="content-area">
                          <Link href={`/${year}/speakers/${speaker.id}`}>{speaker.fullName}</Link>
                          <div className="space16" />
                          <p>{speaker.tagLine}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Session Details Sidebar */}
            <div className="col-lg-5">
              <div className="shedule-listarea">
                <div className="content-area">
                  <h4 style={{ marginBottom: "20px" }}>Session Details</h4>
                  <ul>
                    {startFormatted && (
                      <li>
                        <span>
                          <img src="/assets/img/icons/calender1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                          Start: {startFormatted}
                        </span>
                      </li>
                    )}
                    {timeFormatted && (
                      <li>
                        <span>
                          <img src="/assets/img/icons/clock1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                          {timeFormatted}
                        </span>
                      </li>
                    )}
                    {talk.room && (
                      <li>
                        <span>
                          <img src="/assets/img/icons/location1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                          {talk.room}
                        </span>
                      </li>
                    )}
                  </ul>

                  <div className="space24" />

                  {/* Action Buttons */}
                  <div
                    className="btn-area1"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {/* Add to Calendar Button */}
                    <AddToCalendarWrapper
                      name={talk.title}
                      description={talk.description || ""}
                      startDate={startDate}
                      startTime={startTime}
                      endDate={endDate}
                      endTime={endTime}
                      location={talk.room || "World Trade Center Barcelona"}
                    />

                    {/* OpenFeedback Vote Button */}
                    <a href={voteUrl} target="_blank" rel="noopener noreferrer" className="vl-btn1">
                      <span className="demo">
                        <i className="fa-solid fa-thumbs-up" style={{ marginRight: "8px" }} />
                        Vote on OpenFeedback
                      </span>
                    </a>

                    {/* Buy Tickets Link */}
                    <Link href="/pricing-plan" className="vl-btn1">
                      <span className="demo">Get Tickets</span>
                    </Link>
                  </div>
                </div>

                <div className="space30" />

                {/* Venue Map */}
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      src={venueMapUrl}
                      width={460}
                      height={350}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="World Trade Center Barcelona"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Talks Section */}
      {relatedTalks.length > 0 && (
        <div className="event-single-section-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="event2-header heading2 text-center">
                  <h2>More Talks from This Track</h2>
                </div>
              </div>
              <div className="space32" />
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <div className="event-widget-area">
                      {relatedTalks.map((relatedTalk, index) => {
                        const relSpeakers = relatedTalksSpeakers.get(relatedTalk.id) || [];
                        const relTime =
                          relatedTalk.startsAt && relatedTalk.endsAt
                            ? `${format(parseISO(relatedTalk.startsAt), "h:mm a")} - ${format(parseISO(relatedTalk.endsAt), "h:mm a")}`
                            : "";
                        return (
                          <div className="row" key={relatedTalk.id}>
                            <div className="col-lg-10 m-auto">
                              <div className="event2-boxarea box1" style={{ marginBottom: "24px" }}>
                                <h1 className="active">{String(index + 1).padStart(2, "0")}</h1>
                                <div className="row align-items-center">
                                  <div className="col-lg-12">
                                    <div className="content-area">
                                      <ul>
                                        {relTime && (
                                          <li>
                                            <span>
                                              <img src="/assets/img/icons/clock1.svg" alt="" />
                                              {relTime}
                                              {relatedTalk.room && <span> | </span>}
                                            </span>
                                          </li>
                                        )}
                                        {relatedTalk.room && (
                                          <li>
                                            <span>
                                              <img src="/assets/img/icons/location1.svg" alt="" />
                                              {relatedTalk.room}
                                            </span>
                                          </li>
                                        )}
                                      </ul>
                                      <div className="space20" />
                                      <Link href={`/${year}/talks/${relatedTalk.id}`} className="head">
                                        {relatedTalk.title}
                                      </Link>
                                      <div className="space24" />
                                      <div className="author-area">
                                        {relSpeakers.slice(0, 2).map((speaker, speakerIdx) => (
                                          <div
                                            key={speaker.id}
                                            className="autho-name-area"
                                            style={{
                                              padding: speakerIdx > 0 ? "0 0 0 12px" : undefined,
                                              border: speakerIdx > 0 ? "none" : undefined,
                                            }}
                                          >
                                            <div className="img1">
                                              <Image
                                                src={speaker.profilePicture}
                                                alt={speaker.fullName}
                                                width={50}
                                                height={50}
                                                style={{
                                                  borderRadius: "50%",
                                                  objectFit: "cover",
                                                }}
                                              />
                                            </div>
                                            <div className="text">
                                              <Link href={`/${year}/speakers/${speaker.id}`}>{speaker.fullName}</Link>
                                              <div className="space8" />
                                              <p>{speaker.tagLine}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="space24" />
                                      <div className="btn-area1">
                                        <Link href={`/${year}/talks/${relatedTalk.id}`} className="vl-btn1">
                                          <span className="demo">View Session Details</span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <CTASection
        eventDate={formatEventDateRange(eventData.event.startDay, eventData.event.endDay)}
        eventLocation={eventData.venue}
        ticketUrl={eventData.tickets.url}
      />
    </div>
  );
}
