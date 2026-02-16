"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SpeakersFilterBarProps {
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function SpeakersFilterBar({ placeholder = "Search by name, tagline, or bio...", className = "" }: Readonly<SpeakersFilterBarProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      const currentQ = searchParams.get("q") || "";
      if (currentQ !== query) {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, pathname, router, searchParams]);

  return (
    <div className={`talks-filter-bar mb-5 ${className}`}>
      <div className="row g-4 align-items-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="search-input-wrapper position-relative">
            <i
              className="fa-solid fa-magnifying-glass position-absolute"
              style={{
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
            <input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
              style={{
                paddingLeft: "40px",
                height: "50px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "16px",
                width: "100%",
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
