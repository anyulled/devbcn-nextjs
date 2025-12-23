"use client";

import { useEffect, useState } from "react";

const IMAGES = [
  "assets/img/all-images/venue/wtc-gemini-2.webp",
  "assets/img/all-images/venue/wtc-gemini-1.webp",
  "assets/img/all-images/venue/wtc-gemini-3.webp",
  "assets/img/all-images/venue/venue-1.webp",
  "assets/img/all-images/venue/venue-2.webp",
  "assets/img/all-images/venue/venue-3.webp",
  "assets/img/all-images/venue/venue-4.webp",
  "assets/img/all-images/venue/venue-5.webp",
];

const ROTATION_INTERVAL = 10000; // 10 seconds

interface BackgroundCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export default function BackgroundCarousel({ children, className = "" }: BackgroundCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`background-carousel ${className}`}>
      {/* Background images with fade transition */}
      {IMAGES.map((image, index) => (
        <div
          key={image}
          className="background-carousel__image"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentImageIndex ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
        />
      ))}

      {/* Animated gradient overlay */}
      <div className="background-carousel__gradient" />

      {/* Static vignette overlay with backdrop blur */}
      <div className="background-carousel__vignette" />

      {/* Content */}
      <div className="background-carousel__content">{children}</div>

      <style jsx>{`
        .background-carousel {
          position: relative;
          padding: 70px 0 40px;
          overflow: hidden;
        }

        .background-carousel__image {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
        }

        .background-carousel__gradient {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(-45deg, #4798ca70, #be345570, #00245470, #34bb9c70);
          background-size: 400% 400%;
          background-position: 0 50%;
          animation: gradient 15s ease infinite;
          z-index: 1;
        }

        .background-carousel__vignette {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          backdrop-filter: blur(2px);
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
          pointer-events: none;
          z-index: 2;
        }

        .background-carousel__content {
          position: relative;
          z-index: 3;
        }

        @keyframes gradient {
          0% {
            background-position: 0 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0 50%;
          }
        }
      `}</style>
    </div>
  );
}
