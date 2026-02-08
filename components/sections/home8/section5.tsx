"use client";
import { Speaker } from "@/hooks/types";
import Image from "next/image";
import Link from "next/link";
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
  speakers: Speaker[];
  totalSpeakers: number;
}

export default function Section5({ year, speakers, totalSpeakers }: Section5Props) {
  return (
    <>
      <div className="team8-section-rea sp1" style={{ position: "relative" }}>
        <Image src="/assets/img/bg/header-bg20.png" alt="Background" fill priority={false} style={{ objectFit: "cover", zIndex: -1 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-5">
              <div className="heading11 space-margin60">
                <h5>{totalSpeakers} Event Speakers</h5>
                <div className="space18" />
                <h2 className="text-anime-style-3">Meet Our Speakers</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 team-slider-area8">
              <Swiper {...swiperOptions} className=" owl-carousel">
                {speakers.length === 0 ? (
                  <SwiperSlide className="team-widget-boxarea">
                    <div className="text-area">
                      <p>No speakers available yet.</p>
                    </div>
                  </SwiperSlide>
                ) : (
                  speakers.map((speaker) => (
                    <SwiperSlide key={speaker.id} className="team-widget-boxarea">
                      <div className="img1 image-anime" style={{ position: "relative", aspectRatio: "250/307" }}>
                        <Link href={`/${year}/speakers/${speaker.id}`} style={{ display: "block", position: "relative", width: "100%", height: "100%" }}>
                          <Image
                            src={speaker.profilePicture || "/assets/img/all-images/team/team-img28.png"}
                            alt={speaker.fullName}
                            fill
                            sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, (max-width: 1199px) 33vw, 25vw"
                            style={{ objectFit: "cover" }}
                          />
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
