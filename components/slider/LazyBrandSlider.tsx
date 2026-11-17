"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

export default function LazyBrandSlider() {
  const { containerRef, isVisible } = useInViewOnce();
  const [SliderComponent, setSliderComponent] = useState<ComponentType | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    if (!isVisible || SliderComponent || loadFailed) {
      return;
    }

    const status = { mounted: true };
    import("./BrandSlider")
      .then((mod) => {
        const LoadedSlider = mod.default;
        if (status.mounted) {
          setSliderComponent(() => LoadedSlider);
        }
      })
      .catch((importError: unknown) => {
        console.error("Failed to load BrandSlider:", importError);
        if (status.mounted) {
          setLoadFailed(true);
        }
      });

    return () => {
      status.mounted = false;
    };
  }, [isVisible, SliderComponent, loadFailed, loadAttempt]);

  const handleRetry = () => {
    setLoadFailed(false);
    setLoadAttempt((previousAttempt) => previousAttempt + 1);
  };

  return (
    <div ref={containerRef} style={{ minHeight: "144px" }}>
      {SliderComponent && <SliderComponent />}
      {!SliderComponent && loadFailed && (
        <div className="text-center" role="alert">
          <p className="mb-3">Unable to load sponsors right now.</p>
          <button type="button" className="vl-btn8" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
