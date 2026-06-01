import { format, isValid, parseISO } from "date-fns";

const OPENFEEDBACK_BASE_URL = "https://openfeedback.io";

const getSessionDate = (startsAt: string | null | undefined): string | null => {
  if (!startsAt) {
    return null;
  }

  const datePrefixMatch = startsAt.match(/^(\d{4}-\d{2}-\d{2})/);
  if (datePrefixMatch) {
    return datePrefixMatch[1];
  }

  const parsedDate = parseISO(startsAt);
  if (!isValid(parsedDate)) {
    return null;
  }

  return format(parsedDate, "yyyy-MM-dd");
};

export const buildOpenFeedbackTalkUrl = (openFeedbackId: string, startsAt: string | null | undefined, talkId: string): string => {
  const sessionDate = getSessionDate(startsAt);
  if (!sessionDate) {
    return `${OPENFEEDBACK_BASE_URL}/${talkId}`;
  }

  return `${OPENFEEDBACK_BASE_URL}/${openFeedbackId}/${sessionDate}/${talkId}`;
};
