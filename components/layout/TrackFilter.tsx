"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TrackFilterProps {
  tracks: string[];
  year: number | string;
}

const STORAGE_KEY = "talks-track-filter";

export default function TrackFilter({ tracks, year }: TrackFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  // Initialize from URL params or sessionStorage
  useEffect(() => {
    const urlTrack = searchParams.get("track");
    if (urlTrack) {
      setSelectedTrack(urlTrack);
      sessionStorage.setItem(STORAGE_KEY, urlTrack);
    } else {
      const storedTrack = sessionStorage.getItem(STORAGE_KEY);
      if (storedTrack && tracks.includes(storedTrack)) {
        setSelectedTrack(storedTrack);
        // Update URL without navigation history entry
        const params = new URLSearchParams(searchParams.toString());
        params.set("track", storedTrack);
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [searchParams, tracks, pathname, router]);

  const handleTrackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrack = event.target.value;
    setSelectedTrack(newTrack);

    const params = new URLSearchParams(searchParams.toString());

    if (newTrack) {
      params.set("track", newTrack);
      sessionStorage.setItem(STORAGE_KEY, newTrack);
    } else {
      params.delete("track");
      sessionStorage.removeItem(STORAGE_KEY);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="track-filter">
      <label htmlFor="track-select" className="track-filter-label">
        Filter by Track:
      </label>
      <select
        id="track-select"
        value={selectedTrack}
        onChange={handleTrackChange}
        className="track-filter-select"
      >
        <option value="">All Tracks</option>
        {tracks.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>
    </div>
  );
}
