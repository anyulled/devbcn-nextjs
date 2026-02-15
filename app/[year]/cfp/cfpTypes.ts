export interface CfpMember {
  name: string;
  photo?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface CfpTrack {
  name: string;
  id: string;
  members: CfpMember[];
}
