"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { SupabaseClient } from "@supabase/supabase-js";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import LogoUpload from "@/components/ui/LogoUpload";

const sponsorProfileSchema = z.object({
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  logo_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().max(2000, "Description cannot exceed 2000 characters").optional(),
  twitter: z.string().max(255).optional().or(z.literal("")),
  linkedin: z.string().max(255).optional().or(z.literal("")),
  bluesky: z.string().max(255).optional().or(z.literal("")),
  instagram: z.string().max(255).optional().or(z.literal("")),
});

type SponsorProfileValues = z.infer<typeof sponsorProfileSchema>;

interface SponsorProfileFormProps {
  initialData: {
    id: string;
    website?: string;
    logo_url?: string;
    description?: string;
    twitter?: string;
    linkedin?: string;
    bluesky?: string;
    instagram?: string;
    edition?: string;
  };
}

function BasicInfoSection({
  register,
  errors,
  edition,
  supabase,
  sponsorId,
  logoUrl,
  setValue,
}: Readonly<{
  register: UseFormRegister<SponsorProfileValues>;
  errors: FieldErrors<SponsorProfileValues>;
  edition?: string;
  supabase: SupabaseClient;
  sponsorId: string;
  logoUrl?: string;
  setValue: (name: keyof SponsorProfileValues, value: string) => void;
}>) {
  return (
    <>
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="website">Company Website</label>
          <input id="website" type="url" {...register("website")} placeholder="https://yourcompany.com" />
          {errors.website && <p className="field-error">{errors.website.message}</p>}
        </div>

        <div className="flex-1">
          <LogoUpload
            supabase={supabase}
            sponsorId={sponsorId}
            currentLogoUrl={logoUrl}
            onUploadSuccess={(url) => setValue("logo_url", url)}
            onRemove={() => setValue("logo_url", "")}
          />
          {errors.logo_url && <p className="field-error">{errors.logo_url.message}</p>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">About Your Company</label>
        <textarea id="description" {...register("description")} placeholder={`Brief description for the ${edition || ""} program...`} rows={5}></textarea>
        {errors.description && <p className="field-error">{errors.description.message}</p>}
      </div>
    </>
  );
}

function SocialSection({ register }: Readonly<{ register: UseFormRegister<SponsorProfileValues> }>) {
  return (
    <>
      <h3 className="section-title">Social Media Links</h3>
      <div className="social-grid">
        <div className="form-group">
          <label htmlFor="twitter">
            <i className="fab fa-twitter"></i> Twitter/X
          </label>
          <input id="twitter" {...register("twitter")} placeholder="@handle" />
        </div>
        <div className="form-group">
          <label htmlFor="linkedin">
            <i className="fab fa-linkedin"></i> LinkedIn
          </label>
          <input id="linkedin" {...register("linkedin")} placeholder="Company Page URL" />
        </div>
        <div className="form-group">
          <label htmlFor="bluesky">
            <i className="fas fa-square"></i> Bluesky
          </label>
          <input id="bluesky" {...register("bluesky")} placeholder="@handle.bsky.social" />
        </div>
        <div className="form-group">
          <label htmlFor="instagram">
            <i className="fab fa-instagram"></i> Instagram
          </label>
          <input id="instagram" {...register("instagram")} placeholder="@handle" />
        </div>
      </div>
    </>
  );
}

function getSocialDefaults(d: SponsorProfileFormProps["initialData"]) {
  return {
    twitter: d?.twitter ?? "",
    linkedin: d?.linkedin ?? "",
    bluesky: d?.bluesky ?? "",
    instagram: d?.instagram ?? "",
  };
}

function getSponsorDefaultValues(d: SponsorProfileFormProps["initialData"]): SponsorProfileValues {
  return {
    website: d?.website ?? "",
    logo_url: d?.logo_url ?? "",
    description: d?.description ?? "",
    ...getSocialDefaults(d),
  };
}

function useSponsorProfileForm(initialData: SponsorProfileFormProps["initialData"]) {
  return useForm<SponsorProfileValues>({
    resolver: zodResolver(sponsorProfileSchema),
    defaultValues: getSponsorDefaultValues(initialData),
  });
}

async function handleSponsorProfileSubmit({ values, initialId }: { values: SponsorProfileValues; initialId: string }) {
  const response = await fetch("/api/sponsor/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sponsorId: initialId,
      ...values,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error || "Failed to update sponsor profile");
  }
}

export default function SponsorProfileForm({ initialData }: Readonly<SponsorProfileFormProps>) {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useSponsorProfileForm(initialData);

  const logoUrl = watch("logo_url");

  const onSubmit = async (values: SponsorProfileValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await handleSponsorProfileSubmit({
        values,
        initialId: initialData.id,
      });

      setSuccessMessage("Profile updated successfully!");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sponsor-form-container">
      {errorMessage && <div className="error-alert">{errorMessage}</div>}
      {successMessage && <div className="success-alert">{successMessage}</div>}

      <BasicInfoSection
        register={register}
        errors={errors}
        edition={initialData.edition}
        supabase={supabase}
        sponsorId={initialData.id}
        logoUrl={logoUrl}
        setValue={setValue}
      />
      <SocialSection register={register} />

      <div className="form-actions">
        <button type="submit" className="action-button primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving Changes..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
