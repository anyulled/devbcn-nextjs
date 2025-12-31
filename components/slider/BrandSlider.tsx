"use client";
import { edition2023 } from "@/config/editions/2023";
import { edition2024 } from "@/config/editions/2024";
import { edition2025 } from "@/config/editions/2025";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { slugify } from "@/lib/utils/slugify";
import Link from "next/link";

// Define locally to avoid modifying global types if not needed elsewhere yet
interface SponsorWithYear extends Sponsor {
  year: string;
}

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
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

// Aggregate sponsors from previous editions (module-level memoization)
const getUniqueSponsors = (): SponsorWithYear[] => {
  const editions = [edition2023, edition2024, edition2025];
  const uniqueSponsorsMap = new Map<string, SponsorWithYear>();

  editions.forEach((edition) => {
    const top = edition.sponsorsData?.top || [];
    const premium = edition.sponsorsData?.premium || [];
    const allRelevant = [...top, ...premium];

    allRelevant.forEach((sponsor) => {
      // Use name as the key for deduplication.
      // We overwrite existing entries so that the LATEST year (from the last edition in the array) is used.
      if (sponsor.name) {
        uniqueSponsorsMap.set(sponsor.name, { ...sponsor, year: edition.edition });
      }
    });
  });

  return Array.from(uniqueSponsorsMap.values());
};

const processedSponsors = getUniqueSponsors();

export default function BrandSlider() {
  return (
    <>
      <Swiper {...swiperOptions} className="brand-slider-area owl-carousel">
        {processedSponsors.map((sponsor, index) => (
          <SwiperSlide key={`${sponsor.name}-${index}`} className="brand-box">
            {sponsor.image && (
              <Link href={`/${sponsor.year}/job-offers/${slugify(sponsor.name)}`}>
                <img src={sponsor.image} alt={sponsor.name} />
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
