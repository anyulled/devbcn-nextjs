"use client";

import { Talk } from "@/hooks/types";
import {
  getLevelFromTalk,
  getLevelStars,
  getTagsFromTalk,
} from "@/hooks/useTalks";
import Link from "next/link";

interface TalkCardProps {
  talk: Talk;
  year: number | string;
}

export default function TalkCard({ talk, year }: TalkCardProps) {
  const level = getLevelFromTalk(talk);
  const levelStars = getLevelStars(level);
  const tags = getTagsFromTalk(talk);
  const voteUrl = `https://openfeedback.io/${talk.id}`;

  return (
    <div className="talk-card">
      <div className="talk-card-content">
        <h4 className="talk-title">
          <Link href={`/${year}/talks/${talk.id}`}>{talk.title}</Link>
        </h4>

        <div className="talk-speakers">
          {talk.speakers.map((speaker, index) => (
            <span key={speaker.id}>
              <Link
                href={`/${year}/speakers/${speaker.id}`}
                className="speaker-link"
              >
                {speaker.name}
              </Link>
              {index < talk.speakers.length - 1 && ", "}
            </span>
          ))}
        </div>

        <div className="talk-meta">
          {levelStars && (
            <span className="talk-level" title={level}>
              {levelStars} {level}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="talk-tags">
            {tags.map((tag, index) => (
              <span key={index} className="talk-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="talk-actions">
          <a
            href={voteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vote-link vl-btn1"
          >
            <i className="fa-solid fa-thumbs-up" /> Vote
          </a>
        </div>
      </div>
    </div>
  );
}
