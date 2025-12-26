"use client";

import { Talk } from "@/hooks/types";
import { groupTalksByTrack } from "@/hooks/useTalks";
import { filterTalks } from "@/lib/utils/talk-filters";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchFilter from "./SearchFilter";
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
  const searchQuery = searchParams.get("q") || "";

  // Filter talks using the utility function
  const filteredTalks = filterTalks(talks, selectedTrack, searchQuery);

  // Group by track
  const groupedTalks = groupTalksByTrack(filteredTalks);

  return (
    <>
      <div className="track-filter-container">
        <div className="row">
          <div className="col-lg-5 mb-3 mb-lg-0">
            <TrackFilter tracks={tracks} year={year} />
          </div>
          <div className="col-lg-7">
            <SearchFilter />
          </div>
        </div>
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
