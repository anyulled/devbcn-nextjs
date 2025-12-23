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

  // Initialize state from URL params or sessionStorage using lazy initializer
  const [selectedTrack, setSelectedTrack] = useState<string>(() => {
    const urlTrack = searchParams.get("track");
    if (urlTrack) {
      sessionStorage.setItem(STORAGE_KEY, urlTrack);
      return urlTrack;
    }
    const storedTrack = sessionStorage.getItem(STORAGE_KEY);
    return storedTrack && tracks.includes(storedTrack) ? storedTrack : "";
  });

  // Sync URL when component mounts with stored track
  useEffect(() => {
    const urlTrack = searchParams.get("track");
    if (!urlTrack && selectedTrack && tracks.includes(selectedTrack)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("track", selectedTrack);
      router.replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

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
      <select id="track-select" value={selectedTrack} onChange={handleTrackChange} className="track-filter-select">
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
