export function getUniqueEditions(editions: Array<string | null | undefined>): string[] {
  return Array.from(new Set(editions.filter((edition): edition is string => typeof edition === "string" && edition.length > 0))).sort((left, right) =>
    right.localeCompare(left, undefined, { numeric: true })
  );
}

export function getSelectedEdition(editions: string[], requestedEdition?: string): string | undefined {
  if (requestedEdition) {
    return requestedEdition;
  }

  return editions[0];
}
