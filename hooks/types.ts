export interface Session {
    id: number;
    name: string;
}

export interface Link {
    title: string;
    url: string;
    linkType: string;
}

export interface Speaker {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    bio: string;
    tagLine: string;
    profilePicture: string;
    sessions: Session[];
    isTopSpeaker: boolean;
    links: Link[];
    questionAnswers: any[];
    categories: any[];
}

export interface TalkSpeaker {
    id: string;
    name: string;
}

export interface CategoryItem {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    categoryItems: CategoryItem[];
    sort: number;
}

export interface QuestionAnswer {
    id: number;
    question: string;
    questionType: string;
    answer: string | null;
    sort: number;
    answerExtra: any | null;
}

export interface Talk {
    id: string;
    title: string;
    description: string;
    startsAt: string;
    endsAt: string;
    isServiceSession: boolean;
    isPlenumSession: boolean;
    speakers: TalkSpeaker[];
    categories: Category[];
    roomId: number;
    room: string;
    liveUrl: string | null;
    recordingUrl: string | null;
    status: string;
    isInformed: boolean;
    isConfirmed: boolean;
    questionAnswers: QuestionAnswer[];
}

export interface SessionGroup {
    groupId: number;
    groupName: string;
    sessions: Talk[];
}
