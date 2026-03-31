"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { SupabaseClient } from "@supabase/supabase-js";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";

// Dynamic import for the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const jobOfferSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255, "Title is too long"),
  location: z.string().max(255, "Location is too long").optional(),
  url: z.string().pipe(z.string().url("Invalid URL")).optional().or(z.literal("")),
  text: z.string().min(10, "Description is too short").max(5000, "Description cannot exceed 5000 characters"),
});

type JobOfferValues = z.infer<typeof jobOfferSchema>;

interface JobOfferFormProps {
  sponsorId: string;
  initialData?: Partial<JobOfferValues> & { id?: string };
}

function FormHeader({ register, errors }: Readonly<{ register: UseFormRegister<JobOfferValues>; errors: FieldErrors<JobOfferValues> }>) {
  return (
    <div className="form-group">
      <label htmlFor="title">
        Job Title <span className="required">*</span>
      </label>
      <input id="title" autoComplete="off" {...register("title")} placeholder="e.g. Senior Software Engineer" />
      {errors.title && <p className="field-error">{errors.title.message}</p>}
    </div>
  );
}

function FormDetails({ register, errors }: Readonly<{ register: UseFormRegister<JobOfferValues>; errors: FieldErrors<JobOfferValues> }>) {
  return (
    <div className="form-row">
      <div className="form-group flex-1">
        <label htmlFor="location">Location</label>
        <input id="location" autoComplete="off" {...register("location")} placeholder="e.g. Barcelona, Spain / Remote" />
        {errors.location && <p className="field-error">{errors.location.message}</p>}
      </div>

      <div className="form-group flex-1">
        <label htmlFor="url">Application URL</label>
        <input id="url" autoComplete="off" {...register("url")} placeholder="https://company.com/careers/apply" />
        {errors.url && <p className="field-error">{errors.url.message}</p>}
      </div>
    </div>
  );
}

function FormDescription({
  control,
  errors,
  textCount,
}: Readonly<{ control: Control<JobOfferValues>; errors: FieldErrors<JobOfferValues>; textCount: number }>) {
  return (
    <div className="form-group markdown-editor-group">
      <label htmlFor="job-description-editor">
        Job Description <span className="required">*</span>
      </label>
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <div data-color-mode="light" id="job-description-editor">
            <MDEditor value={field.value} onChange={field.onChange} height={400} preview="edit" />
          </div>
        )}
      />
      <div className="character-counter">
        <span className={textCount > 4500 ? "warning" : ""}>{textCount.toLocaleString()} / 5,000 characters</span>
      </div>
      {errors.text && <p className="field-error">{errors.text.message}</p>}
    </div>
  );
}

function getJobOfferSubmitLabel(isSubmitting: boolean, initialId?: string) {
  if (isSubmitting) return "Saving...";
  if (initialId) return "Update Job Offer";
  return "Post Job Offer";
}

function useJobOfferForm(initialData?: Partial<JobOfferValues> & { id?: string }) {
  return useForm<JobOfferValues>({
    resolver: zodResolver(jobOfferSchema),
    defaultValues: {
      title: initialData?.title || "",
      location: initialData?.location || "",
      url: initialData?.url || "",
      text: initialData?.text || "",
    },
  });
}

async function handleJobOfferSubmit({
  values,
  supabase,
  sponsorId,
  initialId,
}: {
  values: JobOfferValues;
  supabase: SupabaseClient;
  sponsorId: string;
  initialId?: string;
}) {
  if (initialId) {
    const { error } = await supabase
      .from("job_offers")
      .update({
        ...values,
        updated_at: new Date().toISOString(),
      })
      .eq("id", initialId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("job_offers").insert({
      ...values,
      sponsor_id: sponsorId,
    });
    if (error) throw error;
  }
}

export default function JobOfferForm({ sponsorId, initialData }: Readonly<JobOfferFormProps>) {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useJobOfferForm(initialData);

  const textCount = watch("text")?.length || 0;

  const onSubmit = async (values: JobOfferValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await handleJobOfferSubmit({
        values,
        supabase,
        sponsorId,
        initialId: initialData?.id,
      });
      router.push("/sponsor/job-offers");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save job offer";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLabel = getJobOfferSubmitLabel(isSubmitting, initialData?.id);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sponsor-form-container">
      {errorMessage && <div className="error-alert">{errorMessage}</div>}

      <FormHeader register={register} errors={errors} />
      <FormDetails register={register} errors={errors} />
      <FormDescription control={control} errors={errors} textCount={textCount} />

      <div className="form-actions">
        <button type="button" onClick={() => router.back()} className="action-button secondary" disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="action-button primary" disabled={isSubmitting}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
