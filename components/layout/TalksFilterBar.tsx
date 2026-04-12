"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition, useRef } from "react";
import { motion } from "framer-motion";

interface TalksFilterBarProps {
  readonly tracks: string[];
  readonly year: number | string;
}

export default function TalksFilterBar({ tracks, year: _year }: TalksFilterBarProps) {
  const router = useRouter();

  const formatTrackName = (track: string) => {
    return track.split("(")[0].trim();
  };
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [selectedTrack, setSelectedTrack] = useState<string>(searchParams.get("track") || "");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Update state when URL changes
  useEffect(() => {
    setSelectedTrack(searchParams.get("track") || "");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const updateFilters = useCallback(
    (track: string, query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (track) {
        params.set("track", track);
      } else {
        params.delete("track");
      }

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const handleTrackClick = (track: string) => {
    const newTrack = track === selectedTrack ? "" : track;
    setSelectedTrack(newTrack);
    updateFilters(newTrack, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce the URL update for search
    searchTimeoutRef.current = setTimeout(() => {
      updateFilters(selectedTrack, newQuery);
    }, 300);
  };

  return (
    <div className="talks-filter-bar mb-5">
      <div className="row g-4 align-items-center">
        {/* Search Input */}
        <div className="col-lg-4">
          <div className="search-input-wrapper position-relative">
            <i
              className="fa-solid fa-magnifying-glass position-absolute"
              style={{ left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}
            />
            <input
              type="text"
              placeholder="Search talks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
              style={{
                paddingLeft: "40px",
                height: "50px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "16px",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Track Pills */}
        <div className="col-lg-8">
          <div
            className="tracks-scroll-container"
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              opacity: isPending ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTrackClick("")}
              className={`btn ${!selectedTrack ? "btn-primary" : "btn-light"}`}
              style={{
                borderRadius: "20px",
                padding: "8px 16px",
                whiteSpace: "nowrap",
                fontSize: "14px",
                fontWeight: 500,
                border: "none",
                backgroundColor: !selectedTrack ? "#4f46e5" : "#f3f4f6",
                color: !selectedTrack ? "#fff" : "#4b5563",
                boxShadow: !selectedTrack ? "0 4px 6px -1px rgba(79, 70, 229, 0.2)" : "none",
              }}
            >
              All Tracks
            </motion.button>

            {tracks.map((track) => (
              <motion.button
                key={track}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTrackClick(track)}
                className={`btn ${selectedTrack === track ? "btn-primary" : "btn-light"}`}
                style={{
                  borderRadius: "20px",
                  padding: "8px 16px",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  backgroundColor: selectedTrack === track ? "#4f46e5" : "#f3f4f6",
                  color: selectedTrack === track ? "#fff" : "#4b5563",
                  boxShadow: selectedTrack === track ? "0 4px 6px -1px rgba(79, 70, 229, 0.2)" : "none",
                }}
              >
                {formatTrackName(track)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
