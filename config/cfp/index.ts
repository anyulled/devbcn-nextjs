import type { CfpMember, CfpTrack } from "./cfpTypes";
import { cfpData2023 } from "./cfpData2023";
import { cfpData2024 } from "./cfpData2024";
import { cfpData2025 } from "./cfpData2025";
import { cfpData2026 } from "./cfpData2026";
import { cfpData2027 } from "./cfpData2027";

export type { CfpMember, CfpTrack };

export const cfpData: Record<string, CfpTrack[]> = {
  2027: cfpData2027,
  2026: cfpData2026,
  2025: cfpData2025,
  2024: cfpData2024,
  2023: cfpData2023,
};

const cfpDataMap = new Map<string, CfpTrack[]>(Object.entries(cfpData));

export const hasCfpCommittee = (year: string): boolean => {
  const editionCfp = cfpDataMap.get(year);
  return editionCfp ? editionCfp.some((track) => track.members && track.members.length > 0) : false;
};
