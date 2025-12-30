import TalkContent from "@/components/talks/TalkContent";
import Modal from "@/components/ui/Modal";
import { getEditionConfig } from "@/config/editions";
import { getLevelFromTalk, getSlidesUrl, getTagsFromTalk, getTalkByYearAndId, getTalkSpeakersWithDetails, getTrackFromTalk } from "@/hooks/useTalks";
import { notFound } from "next/navigation";

interface TalkDetailProps {
  params: Promise<{
    year: string;
    talk_id: string;
  }>;
}

export default async function InterceptedTalkDetail({ params }: TalkDetailProps) {
  const { year, talk_id } = await params;
  const talk = await getTalkByYearAndId(year, talk_id);
  const eventData = getEditionConfig(year);

  if (!talk) {
    notFound();
  }

  const speakerIds = talk.speakers.map((s) => s.id);
  const speakers = await getTalkSpeakersWithDetails(year, speakerIds);
  const tags = getTagsFromTalk(talk);
  const slidesUrl = getSlidesUrl(talk);
  const voteUrl = `https://openfeedback.io/${talk.id}`;
  const track = getTrackFromTalk(talk);
  const level = getLevelFromTalk(talk);

  return (
    <Modal>
      <TalkContent
        talk={talk}
        speakers={speakers}
        year={year}
        tags={tags}
        slidesUrl={slidesUrl || ""}
        voteUrl={voteUrl}
        eventData={eventData}
        track={track}
        level={level}
      />
    </Modal>
  );
}
