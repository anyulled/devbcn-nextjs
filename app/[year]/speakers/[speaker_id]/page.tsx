import { getSpeakerByYearAndId } from "@/hooks/useSpeakers";
import Image from "next/image";
import Link from "next/link";

interface SpeakerDetailProps {
  params: Promise<{
    year: string;
    speaker_id: string;
  }>;
}

export default async function SpeakerDetail({ params }: SpeakerDetailProps) {
  const { year, speaker_id } = await params;
  const speaker = await getSpeakerByYearAndId(year, speaker_id);

  if (!speaker) {
    return <div>Speaker not found</div>;
  }

  return (
    <div>
      <aside>
        <Image
          src={speaker.profilePicture}
          alt={speaker.fullName}
          width={200}
          height={200}
        />
      </aside>
      <h1>{speaker.fullName}</h1>
      <h2>{speaker.tagLine}</h2>
      <p>{speaker.bio}</p>

      <aside>
        {speaker.links.map((link) => (
          <div key={link.title}>
            <p>
              <a href={link.url} rel="noopener noreferrer" target="_blank">
                {link.title}
              </a>
            </p>
          </div>
        ))}
      </aside>
      <h3>Sessions</h3>
      <section>
        <ul>
          {speaker.sessions.map((session) => (
            <li key={session.id}>
              <Link href={`/${year}/talks/${session.id}`}>{session.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
