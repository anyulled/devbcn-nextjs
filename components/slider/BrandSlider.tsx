"use client";
import { edition2023 } from "@/config/editions/2023";
import { edition2024 } from "@/config/editions/2024";
import { edition2025 } from "@/config/editions/2025";
import { Sponsor } from "@/config/editions/types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
const getUniqueSponsors = () => {
  const editions = [edition2023, edition2024, edition2025];
  const uniqueSponsorsMap = new Map<string, Sponsor>();

  editions.forEach((edition) => {
    const top = edition.sponsorsData?.top || [];
    const premium = edition.sponsorsData?.premium || [];
    const allRelevant = [...top, ...premium];

    allRelevant.forEach((sponsor) => {
      // Use name as the key for deduplication
      if (sponsor.name && !uniqueSponsorsMap.has(sponsor.name)) {
        uniqueSponsorsMap.set(sponsor.name, sponsor);
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
            {sponsor.image && <img src={sponsor.image} alt={sponsor.name} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
