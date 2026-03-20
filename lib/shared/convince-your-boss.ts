import { EditionConfig } from "@/config/editions/types";

export const getOrdinal = (n: number): string => {
  const v = n % 100;
  if (v >= 11 && v <= 13) {
    return `${n}th`;
  }
  const lastDigit = n % 10;
  switch (lastDigit) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};

export const formatDateWithOrdinal = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  return `${month} ${getOrdinal(day)}`;
};

export const findCurrentCategory = (config: EditionConfig) => {
  const now = new Date();
  return config.tickets.categories.find((cat) => now >= new Date(cat.startDate) && now <= new Date(cat.endDate)) || config.tickets.categories[0];
};
