"use client";

import { Coffee, Cloud, Globe, Users, Brain } from "lucide-react";

interface Track {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const tracks: Track[] = [
  {
    id: "java-jvm",
    name: "Java & JVM",
    icon: Coffee,
    description: "Java, Kotlin, Scala, JVM ecosystem",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    icon: Cloud,
    description: "Cloud, DevOps, VMs, Kubernetes",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Globe,
    description: "JavaScript, TypeScript, Angular, WASM",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    description: "Leadership, Agile, Diversity",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "ai-ml",
    name: "AI & ML",
    icon: Brain,
    description: "Big Data, Machine Learning, AI, Python",
    color: "from-indigo-500 to-violet-600",
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
              <div className={`track-badge__gradient bg-gradient-to-br ${track.color}`} />
              <div className="track-badge__content">
                <Icon className="track-badge__icon" />
                <span className="track-badge__name">{track.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .track-badges {
          width: 100%;
        }

        .track-badges__container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          max-width: 800px;
          margin: 0 auto;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .track-badge {
          position: relative;
          padding: 0.75rem 1.25rem;
          border-radius: 9999px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .track-badge:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .track-badge:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.5);
          outline-offset: 2px;
        }

        .track-badge__gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.15;
          transition: opacity 0.3s ease;
        }

        .track-badge:hover .track-badge__gradient {
          opacity: 0.25;
        }

        .track-badge__content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
          z-index: 1;
        }

        .track-badge__icon {
          width: 1.125rem;
          height: 1.125rem;
          flex-shrink: 0;
        }

        .track-badge__name {
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .track-badges__container {
            gap: 0.5rem;
          }

          .track-badge {
            padding: 0.625rem 1rem;
          }

          .track-badge__content {
            font-size: 0.8125rem;
          }

          .track-badge__icon {
            width: 1rem;
            height: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .track-badge {
            transition: none;
          }

          .track-badge__gradient {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
