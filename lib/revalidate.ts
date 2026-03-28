import { CURRENT_EDITION, isValidEditionYear } from "@/config/editions";

export const getRevalidateInterval = (year: string | number): number | false => {
  const yearStr = String(year);
  const actualYear = isValidEditionYear(yearStr) ? yearStr : CURRENT_EDITION;
  if (actualYear === CURRENT_EDITION) {
    return 604800;
  }
  return false;
};
