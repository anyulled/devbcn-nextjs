"use client";

import { Talk } from "@/hooks/types";
import { groupTalksByTrack } from "@/hooks/useTalks";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TalkCard from "./TalkCard";
import TrackFilter from "./TrackFilter";

interface TalksListProps {
  talks: Talk[];
  tracks: string[];
  year: number | string;
}

function TalksListContent({ talks, tracks, year }: TalksListProps) {
  const searchParams = useSearchParams();
  const selectedTrack = searchParams.get("track") || "";

  // Filter talks if a track is selected
  const filteredTalks = selectedTrack
    ? talks.filter((talk) => {
        const trackCategory = talk.categories.find((cat) => cat.name === "Track");
        return trackCategory?.categoryItems[0]?.name === selectedTrack;
      })
    : talks;

  // Group by track
  const groupedTalks = groupTalksByTrack(filteredTalks);

  return (
    <>
      <div className="track-filter-container">
        <TrackFilter tracks={tracks} year={year} />
      </div>

      <div className="talks-grouped">
        {Array.from(groupedTalks.entries()).map(([track, trackTalks]) => (
          <div key={track} className="track-section">
            <h3 className="track-heading">{track}</h3>
            <div className="talks-grid">
              {trackTalks.map((talk) => (
                <TalkCard key={talk.id} talk={talk} year={year} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function TalksList({ talks, tracks, year }: TalksListProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TalksListContent talks={talks} tracks={tracks} year={year} />
    </Suspense>
  );
}
