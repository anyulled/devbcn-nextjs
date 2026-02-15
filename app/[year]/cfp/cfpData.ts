import type { CfpTrack } from "./cfpTypes";
import { cfpData2023 } from "./cfpData2023";
import { cfpData2024 } from "./cfpData2024";
import { cfpData2025 } from "./cfpData2025";
import { cfpData2026 } from "./cfpData2026";

export const cfpData: Record<string, CfpTrack[]> = {
  2026: cfpData2026,
  2025: cfpData2025,
  2024: cfpData2024,
  2023: cfpData2023,
};
