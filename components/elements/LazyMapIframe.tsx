"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";

interface LazyMapIframeProps {
  title: string;
  src: string;
  width: number;
  height: number;
}

export default function LazyMapIframe({ title, src, width, height }: Readonly<LazyMapIframeProps>) {
  const { containerRef, isVisible } = useInViewOnce();

  return (
    <div ref={containerRef} style={{ minHeight: `${height}px`, width: "100%" }}>
      {isVisible ? (
        <iframe
          title={title}
          src={src}
          width={width}
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
}
