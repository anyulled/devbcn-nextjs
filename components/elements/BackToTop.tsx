"use client";
import { useEffect, useState } from "react";

export default function BackToTop({ target }: Readonly<{ target: string }>) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const state = { isTicking: false, frameId: 0 };
    const onScroll = () => {
      if (!state.isTicking) {
        state.frameId = window.requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > 100);
          state.isTicking = false;
        });
        state.isTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (state.frameId) window.cancelAnimationFrame(state.frameId);
    };
  }, []);

  const handleClick = () => {
    const element = document.querySelector(target);
    if (element instanceof HTMLElement) {
      window.scrollTo({
        top: element.offsetTop,
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
