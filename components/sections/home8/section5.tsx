"use client";
import { Speaker } from "@/hooks/types";
import { getSpeakers } from "@/hooks/useSpeakers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".owl-next",
    prevEl: ".owl-prev",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
};

/**
 * Get random speakers from the list
 * Always returns an array, even if empty or fewer than requested
 */
function getRandomSpeakers(speakers: Speaker[], count: number): Speaker[] {
  if (!speakers || speakers.length === 0) return [];
  if (speakers.length <= count) return speakers;

  // Fisher-Yates shuffle algorithm
  const shuffled = [...speakers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

/**
 * Truncate tagline to a maximum number of words
 */
function truncateTagline(tagline: string, maxWords: number = 5): string {
  if (!tagline) return "";
  const words = tagline.split(/\s+/);
  if (words.length <= maxWords) return tagline;
  return words.slice(0, maxWords).join(" ") + "...";
}

interface Section5Props {
  year: string | number;
}

export default function Section5({ year }: Section5Props) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [speakersCount, setSpeakersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        setLoading(true);
        setError(null);
        const allSpeakers = await getSpeakers(year);
        const randomSpeakers = getRandomSpeakers(allSpeakers, 6);
        setSpeakers(randomSpeakers);
        setSpeakersCount(allSpeakers.length);
      } catch (err) {
        setError("Failed to load speakers");
        console.error("Error fetching speakers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSpeakers();
  }, [year]);

  return (
    <>
      <div
        className="team8-section-rea sp1"
        style={{
          backgroundImage: "url(/assets/img/bg/header-bg20.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="heading11 space-margin60">
                <h5>{speakersCount} Event Speakers</h5>
                <div className="space18" />
                <h2 className="text-anime-style-3">Meet Our Speakers</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 team-slider-area8">
              <Swiper {...swiperOptions} className=" owl-carousel">
                {loading ? (
                  <SwiperSlide className="team-widget-boxarea">
                    <div className="text-area">
                      <p>Loading speakers...</p>
                    </div>
                  </SwiperSlide>
                ) : error ? (
                  <SwiperSlide className="team-widget-boxarea">
                    <div className="text-area">
                      <p>{error}</p>
                    </div>
                  </SwiperSlide>
                ) : speakers.length === 0 ? (
                  <SwiperSlide className="team-widget-boxarea">
                    <div className="text-area">
                      <p>No speakers available yet.</p>
                    </div>
                  </SwiperSlide>
                ) : (
                  speakers.map((speaker) => (
                    <SwiperSlide key={speaker.id} className="team-widget-boxarea">
                      <div className="img1 image-anime">
                        <Link href={`/${year}/speakers/${speaker.id}`}>
                          <img src={speaker.profilePicture || "/assets/img/all-images/team/team-img28.png"} alt={speaker.fullName} />
                        </Link>
                      </div>
                      <div className="space20" />
                      <div className="text-area">
                        <Link href={`/${year}/speakers/${speaker.id}`}>{speaker.fullName}</Link>
                        <div className="space16" />
                        <p>{truncateTagline(speaker.tagLine)}</p>
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
              {speakers.length > 3 && (
                <div className="owl-nav">
                  <button type="button" role="presentation" className="owl-prev h1p">
                    <i className="fa-solid fa-angle-left" />
                  </button>
                  <button type="button" role="presentation" className="owl-next h1n">
                    <i className="fa-solid fa-angle-right" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
