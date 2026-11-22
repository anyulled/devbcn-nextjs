"use client";

import { Coffee, Cloud, Globe, Users, Brain } from "lucide-react";

interface Track {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tracks: Track[] = [
  {
    id: "java-jvm",
    name: "Java & JVM",
    icon: Coffee,
    description: "Java, Kotlin, Scala, JVM ecosystem",
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    icon: Cloud,
    description: "Cloud, DevOps, VMs, Kubernetes",
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Globe,
    description: "JavaScript, TypeScript, Angular, WASM",
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    description: "Leadership, Agile, Diversity",
  },
  {
    id: "ai-ml",
    name: "AI & ML",
    icon: Brain,
    description: "Big Data, Machine Learning, AI, Python",
  },
];

interface TrackBadgesProps {
  onTrackClick?: (trackId: string) => void;
  className?: string;
}

export default function TrackBadges({ onTrackClick, className = "" }: Readonly<TrackBadgesProps>) {
  return (
    <div className={`track-badges ${className}`}>
      <div className="track-badges__container">
        {tracks.map((track, index) => {
          const Icon = track.icon;
          const isClickable = !!onTrackClick;

          return (
            <div
              key={track.id}
              className="track-badge"
              onClick={() => onTrackClick?.(track.id)}
              style={{
                cursor: isClickable ? "pointer" : "default",
                animationDelay: `${index * 100}ms`,
              }}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={
                isClickable
                  ? (e: React.KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onTrackClick?.(track.id);
                      }
                    }
                  : undefined
              }
            >
              <div className={`track-badge__gradient track-badge__gradient--${track.id}`} />
              <div className="track-badge__content">
                <Icon className="track-badge__icon" />
                <span className="track-badge__name">{track.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
