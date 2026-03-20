"use client";
import { useEffect, useState } from "react";

export default function BackToTop({ target }: Readonly<{ target: string }>) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    /*
     * ⚡ Bolt Optimization:
     * - Throttles scroll events using requestAnimationFrame to prevent main-thread blocking and excessive re-renders.
     * - Uses passive event listener to allow the browser to perform smooth scrolling without waiting for JS execution.
     * Expected impact: Significant reduction in CPU usage and jank during fast scrolling.
     */
    const state = { isTicking: false, tickingId: 0 };

    const onScroll = () => {
      if (!state.isTicking) {
        state.tickingId = window.requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > 100);
          state.isTicking = false;
        });
        state.isTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(state.tickingId);
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
