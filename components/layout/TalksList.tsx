"use client";

import { Talk } from "@/hooks/types";
import { groupTalksByTrack } from "@/hooks/useTalks";
import { filterTalks } from "@/lib/shared/talk-filters";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TalkCard from "./TalkCard";
import TalksFilterBar from "./TalksFilterBar";

interface TalksListProps {
  talks: Talk[];
  tracks: string[];
  year: number | string;
}

function TalksListContent({ talks, tracks, year }: Readonly<TalksListProps>) {
  const searchParams = useSearchParams();
  const selectedTrack = searchParams.get("track") || "";
  const searchQuery = searchParams.get("q") || "";

  const filteredTalks = filterTalks(talks, selectedTrack, searchQuery);
  const groupedTalks = groupTalksByTrack(filteredTalks);

  return (
    <>
      <TalksFilterBar tracks={tracks} year={year} />

      <div className="talks-container">
        {filteredTalks.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-5">
            <div className="mb-3">
              <i className="fa-solid fa-magnifying-glass fa-3x text-muted" />
            </div>
            <h3 className="h4 text-muted">No talks found</h3>
            <p className="text-muted">Try adjusting your search or filter to find what you&apos;re looking for.</p>
          </motion.div>
        ) : (
          <div className="talks-grouped">
            <AnimatePresence mode="wait">
              {Array.from(groupedTalks.entries()).map(([track, trackTalks]) => (
                <motion.div
                  key={track}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="track-section mb-5"
                >
                  <h3 className="track-heading mb-4 d-flex align-items-center gap-2">
                    <span
                      className="track-color-indicator"
                      style={{
                        width: "4px",
                        height: "24px",
                        backgroundColor: "#4f46e5",
                        borderRadius: "2px",
                        display: "inline-block",
                      }}
                    />
                    {track}
                    <span className="text-muted fs-6 fw-normal ms-2">({trackTalks.length})</span>
                  </h3>
                  <div className="row g-4">
                    {trackTalks.map((talk) => (
                      <div key={talk.id} className="col-12 col-md-6 col-lg-4">
                        <TalkCard talk={talk} year={year} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
}

export default function TalksList({ talks, tracks, year }: Readonly<TalksListProps>) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <TalksListContent talks={talks} tracks={tracks} year={year} />
    </Suspense>
  );
}
