import { getEditionConfig } from "@/config/editions";
import { getSessionizeFetchOptions } from "@/lib/revalidate";

export interface SessionizeFetchOptions {
  strict?: boolean;
}

export async function fetchSessionizeEndpoint<T>(
  year: string | number,
  endpoint: string,
  resourceLabel: string,
  options?: SessionizeFetchOptions
): Promise<T | null> {
  const config = getEditionConfig(year);
  if (!config.sessionizeUrl) {
    return null;
  }

  try {
    const url = `${config.sessionizeUrl}${endpoint}`;
    const response = await fetch(url, getSessionizeFetchOptions(year));
    if (!response.ok) {
      const errorMessage = `Failed to fetch ${resourceLabel} for year ${year}: ${response.statusText}`;
      console.error(errorMessage);
      if (options?.strict) {
        throw new Error(errorMessage);
      }
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error fetching ${resourceLabel} for year ${year}:`, error);
    if (options?.strict) {
      throw error;
    }
    return null;
  }
}
