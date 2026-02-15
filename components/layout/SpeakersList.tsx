"use client";

import { Speaker } from "@/hooks/types";
import { filterSpeakers } from "@/lib/shared/speaker-filters";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchFilter from "./SearchFilter";
import SpeakerCard from "./SpeakerCard";

interface SpeakersListProps {
  speakers: Speaker[];
  year: number;
}

function SpeakersListContent({ speakers, year }: SpeakersListProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const filteredSpeakers = filterSpeakers(speakers, searchQuery);

  return (
    <>
      <div className="container mb-5">
        <div className="row mb-5">
          <div className="col-12">
            <div className="blog-details-section">
              <SearchFilter label="Filter Speakers" placeholder="Search by name or tagline..." />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="team-sperkers-section-area">
              {filteredSpeakers.length > 0 ? (
                <div className="row">
                  {filteredSpeakers.map((speaker) => (
                    <div key={speaker.id} className="col-lg-3 col-md-6 mb-4">
                      <SpeakerCard
                        name={speaker.fullName}
                        image={speaker.profilePicture}
                        position={speaker.tagLine}
                        links={speaker.links}
                        speakerId={speaker.id}
                        year={year}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center" style={{ padding: "40px 0" }}>
                  <h4 style={{ color: "#666" }}>No speakers found matching &quot;{searchQuery}&quot;</h4>
                  <p>Try adjusting your search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SpeakersList({ speakers, year }: SpeakersListProps) {
  return (
    <Suspense fallback={<div className="container text-center py-5">Loading speakers...</div>}>
      <SpeakersListContent speakers={speakers} year={year} />
    </Suspense>
  );
}
