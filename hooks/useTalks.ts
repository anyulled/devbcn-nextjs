import { Talk, SessionGroup } from './types';

const YEAR_ENDPOINTS: Record<string | number, string> = {
    default: "https://sessionize.com/api/v2/xhudniix/view/Sessions",
    2023: "https://sessionize.com/api/v2/ttsitynd/view/Sessions",
    2024: "https://sessionize.com/api/v2/teq4asez/view/Sessions",
};

export const getTalks = async (year: string | number = 'default'): Promise<SessionGroup[]> => {
    const url = YEAR_ENDPOINTS[year] || YEAR_ENDPOINTS['default'];
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch talks');
    }
    const data: SessionGroup[] = await response.json();
    return data;
};

export const getTalkByYearAndId = async (year: string | number, talkId: string): Promise<Talk | undefined> => {
    const sessionGroups = await getTalks(year);
    const allTalks = sessionGroups.flatMap(group => group.sessions);
    return allTalks.find(talk => talk.id === talkId);
};
