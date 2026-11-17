"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

export default function LazyBrandSlider() {
  const { containerRef, isVisible } = useInViewOnce();
  const [SliderComponent, setSliderComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!isVisible || SliderComponent) {
      return;
    }

    const status = { mounted: true };
    void import("./BrandSlider").then((mod) => {
      if (status.mounted) {
        setSliderComponent(() => mod.default);
      }
    });

    return () => {
      status.mounted = false;
    };
  }, [isVisible, SliderComponent]);

  return (
    <div ref={containerRef} style={{ minHeight: "144px" }}>
      {SliderComponent ? <SliderComponent /> : null}
    </div>
  );
}
