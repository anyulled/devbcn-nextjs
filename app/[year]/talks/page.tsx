import { getTalks } from "@/hooks/useTalks";
import { Talk } from "@/hooks/types";
import Link from "next/link";

interface TalksProps {
    params: Promise<{
        year: number;
    }>;
}

export default async function Talks({ params }: TalksProps) {
    const { year } = await params;
    const sessionGroups = await getTalks(year);
    const talks = sessionGroups.flatMap(group => group.sessions);

    return (
        <div>
            <h1>Talks {year}</h1>
            <ul>
                {talks.map((talk: Talk) => (
                    <li key={talk.id}>
                        <Link href={`/${year}/talks/${talk.id}`}>{talk.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}