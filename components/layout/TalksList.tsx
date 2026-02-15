"use client";

import { Talk } from "@/hooks/types";
import { groupTalksByTrack } from "@/hooks/useTalks";
import { filterTalks } from "@/lib/shared/talk-filters";
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

  const filteredTalks = filterTalks(talks, selectedTrack, searchQuery);

  const groupedTalks = groupTalksByTrack(filteredTalks);

  return (
    <>
      <div className="row mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="blog-details-section">
            <div className="blog-auhtor-details">
              <div className="search-area">
                <h3 className="mb-4">Filter by Track</h3>
                <TrackFilter tracks={tracks} year={year} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="blog-details-section">
            <SearchFilter label="Search Talks" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="talks-grouped">
            {Array.from(groupedTalks.entries()).map(([track, trackTalks]) => (
              <div key={track} className="track-section mb-5">
                <h3 className="track-heading mb-4">{track}</h3>
                <div className="row">
                  {trackTalks.map((talk) => (
                    <div key={talk.id} className="col-lg-6 mb-4">
                      <TalkCard talk={talk} year={year} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
