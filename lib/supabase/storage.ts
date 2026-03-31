import { SupabaseClient } from "@supabase/supabase-js";

export const BUCKET_NAME = "sponsor_logos";

/**
 * Sanitizes a filename by removing special characters and adding a timestamp
 * @param filename Original filename
 * @param sponsorId The sponsor UUID to keep files organized
 * @returns Sanitized filename
 */
export function sanitizeFileName(filename: string, sponsorId: string): string {
  const extension = filename.split(".").pop();
  const cleanName = filename
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");

  return `${sponsorId}/${cleanName}-${Date.now()}.${extension}`;
}

/**
 * Uploads a file to the sponsor_logos bucket
 * @param supabase Supabase client
 * @param file File object to upload
 * @param sponsorId The sponsor UUID
 * @returns Public URL of the uploaded file
 */
export async function uploadSponsorLogo(supabase: SupabaseClient, file: File, sponsorId: string): Promise<string> {
  const filePath = sanitizeFileName(file.name, sponsorId);

  const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
}
