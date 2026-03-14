"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const IMAGES = [
  "/assets/img/all-images/venue/wtc-gemini-2.webp",
  "/assets/img/all-images/venue/wtc-gemini-1.webp",
  "/assets/img/all-images/venue/wtc-gemini-3.webp",
  "/assets/img/all-images/venue/venue-1.webp",
  "/assets/img/all-images/venue/venue-2.webp",
  "/assets/img/all-images/venue/venue-3.webp",
  "/assets/img/all-images/venue/venue-4.webp",
  "/assets/img/all-images/venue/venue-5.webp",
  "/assets/img/all-images/venue/venue-6.webp",
  "/assets/img/all-images/venue/venue-7.webp",
  "/assets/img/all-images/venue/venue-8.webp",
  "/assets/img/all-images/venue/venue-9.webp",
  "/assets/img/all-images/venue/venue-10.webp",
  "/assets/img/all-images/venue/venue-11.webp",
  "/assets/img/all-images/venue/venue-12.webp",
];

const SLIDE_DURATION = 7000;

interface BackgroundCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export default function BackgroundCarousel({ children, className = "" }: Readonly<BackgroundCarouselProps>) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (globalThis.window !== undefined) {
      return globalThis.window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = globalThis.window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={`background-carousel ${className}`}>
      {/* Swiper Background */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1500}
        autoplay={{
          delay: SLIDE_DURATION,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        onSwiper={() => {}}
        className="background-carousel__swiper"
        allowTouchMove={false}
      >
        {IMAGES.map((image, index) => (
          <SwiperSlide key={image}>
            <div className={`background-carousel__slide ${prefersReducedMotion ? "" : "ken-burns"}`}>
              <Image src={image} alt="Conference venue background" fill priority={index === 0} sizes="100vw" style={{ objectFit: "cover" }} quality={85} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Animated gradient overlay */}
      <div className="background-carousel__gradient" />

      {/* Vignette overlay with backdrop blur */}
      <div className="background-carousel__vignette" />

      {/* Content */}
      <div className="background-carousel__content">{children}</div>
    </div>
  );
}
