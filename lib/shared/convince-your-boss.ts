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

export const isTicketSaleActive = (config: EditionConfig): boolean => {
  const now = new Date();
  const categories = config.tickets.categories;
  if (!categories || categories.length === 0) return false;

  const earlyBird = categories.find((c) => c.name.toLowerCase().includes("early bird")) || categories[0];
  const lastMinute = categories.find((c) => c.name.toLowerCase().includes("super last minute")) || categories.at(-1)!;

  return now >= new Date(earlyBird.startDate) && now <= new Date(lastMinute.endDate);
};

export const findCurrentCategory = (config: EditionConfig) => {
  const now = new Date();
  return config.tickets.categories.find((cat) => now >= new Date(cat.startDate) && now <= new Date(cat.endDate));
};
