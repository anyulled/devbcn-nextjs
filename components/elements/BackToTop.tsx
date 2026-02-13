"use client";
import { useEffect, useState } from "react";

export default function BackToTop({ target }: any) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId: number;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > 100);
          ticking = false;
        });
      }
    };

    // Use passive listener for better scrolling performance
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleClick = () => {
    const targetElement = document.querySelector(target);
    if (targetElement) {
      window.scrollTo({
        top: (targetElement as HTMLElement).offsetTop,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {hasScrolled && (
        <div className="paginacontainer" onClick={handleClick}>
          <div className="progress-wrap">
            <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
              <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
