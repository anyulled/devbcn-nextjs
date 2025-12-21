import { getTalkByYearAndId } from "@/hooks/useTalks";
import Link from "next/link";
interface TalkDetailProps {
  params: Promise<{
    year: string;
    talk_id: string;
  }>;
}

export default async function TalkDetail({ params }: TalkDetailProps) {
  const { year, talk_id } = await params;
  const talk = await getTalkByYearAndId(year, talk_id);
  const speaker = talk?.speakers;

  return (
    <div>
      <h1>Talk Detail: {talk?.title}</h1>
      <section>
        <p>{talk?.description}</p>
      </section>
      <section>
        {speaker?.map((speaker) => (
          <p key={speaker.id}>
            <Link href={`/${year}/speakers/${speaker.id}`}>{speaker.name}</Link>
          </p>
        ))}
      </section>
    </div>
  );
}
