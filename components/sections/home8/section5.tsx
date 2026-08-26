"use client";
import { Speaker } from "@/hooks/types";
import Link from "next/link";
import Image from "next/image";
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

  navigation: {
    nextEl: ".owl-next",
    prevEl: ".owl-prev",
  },

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

export default function Section5({ year, speakers, totalSpeakers }: Readonly<Section5Props>) {
  return (
    <div className="team8-section-rea home8-purple-surface sp1">
      <div className="container">
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
                    <div className="img1 image-anime">
                      <Link href={`/${year}/speakers/${speaker.id}`}>
                        <Image
                          src={speaker.profilePicture || "/assets/img/all-images/team/team-img28.png"}
                          alt={speaker.fullName}
                          width={400}
                          height={500}
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
  );
}
