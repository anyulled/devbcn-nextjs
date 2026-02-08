"use client";

import { useEffect, useState } from "react";

interface VideoOverlayProps {
  opacity?: number;
  className?: string;
}

export default function VideoOverlay({ opacity = 0.3, className = "" }: Readonly<VideoOverlayProps>) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof globalThis.window !== "undefined") {
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
    <div className={`video-overlay ${className}`} style={{ opacity }}>
      {/* Animated particles/light leaks */}
      <div className="video-overlay__particles">
        {!prefersReducedMotion &&
          [...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i * 12.5) % 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${15 + i * 2}s`,
              }}
            />
          ))}
      </div>

      {/* Cinematic light leaks */}
      <div className="video-overlay__light-leaks">
        {!prefersReducedMotion && (
          <>
            <div className="light-leak light-leak--1" />
            <div className="light-leak light-leak--2" />
            <div className="light-leak light-leak--3" />
          </>
        )}
      </div>

      {/* Subtle scan lines for tech feel */}
      <div className="video-overlay__scanlines" />
    </div>
  );
}
