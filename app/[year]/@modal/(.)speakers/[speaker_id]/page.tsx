import SpeakerContent from "@/components/speakers/SpeakerContent";
import Modal from "@/components/ui/Modal";
import { getEditionConfig } from "@/config/editions";
import { getSpeakerByYearAndId } from "@/hooks/useSpeakers";
import { notFound } from "next/navigation";

interface SpeakerDetailProps {
  params: Promise<{
    year: string;
    speakerId: string;
  }>;
}

export default async function InterceptedSpeakerDetail({ params }: SpeakerDetailProps) {
  const { year, speakerId } = await params;
  const speaker = await getSpeakerByYearAndId(year, speakerId);
  const eventData = getEditionConfig(year);

  if (!speaker) {
    notFound();
  }

  return (
    <Modal>
      <SpeakerContent speaker={speaker} year={year} eventData={eventData} />
    </Modal>
  );
}
