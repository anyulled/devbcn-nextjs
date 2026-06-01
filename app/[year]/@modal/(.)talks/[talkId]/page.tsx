import TalkContent from "@/components/talks/TalkContent";
import Modal from "@/components/ui/Modal";
import { getEditionConfig } from "@/config/editions";
import { getLevelFromTalk, getSlidesUrl, getTagsFromTalk, getTalkByYearAndId, getTalkSpeakersWithDetails, getTrackFromTalk } from "@/hooks/useTalks";
import { buildOpenFeedbackTalkUrl } from "@/lib/shared/openfeedback";
import { notFound } from "next/navigation";

interface TalkDetailProps {
  params: Promise<{
    year: string;
    talkId: string;
  }>;
}

export default async function InterceptedTalkDetail({ params }: TalkDetailProps) {
  const { year, talkId } = await params;
  const talk = await getTalkByYearAndId(year, talkId);
  const eventData = getEditionConfig(year);

  if (!talk) {
    notFound();
  }

  const speakerIds = talk.speakers.map((s) => s.id);
  const speakers = await getTalkSpeakersWithDetails(year, speakerIds);
  const tags = getTagsFromTalk(talk);
  const slidesUrl = getSlidesUrl(talk);
  const voteUrl = buildOpenFeedbackTalkUrl(eventData.openFeedbackId, talk.startsAt, talk.id);
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
