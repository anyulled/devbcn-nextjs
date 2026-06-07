"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { AdminSponsorRecord } from "@/lib/admin/sponsors";
import LogoUpload from "@/components/ui/LogoUpload";
import { createClient } from "@/lib/supabase/client";
import { ContactsSection } from "./ContactsSection";

export const sponsorContactSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  name: z.string().trim().max(255, "Name is too long").optional().or(z.literal("")),
});

export type SponsorContact = z.infer<typeof sponsorContactSchema>;

const adminSponsorSchema = z.object({
  name: z.string().min(2, "Name is too short").max(255, "Name is too long"),
  edition: z.string().min(4, "Edition is required").max(50, "Edition is too long"),
  categoryId: z.number().int().positive("Choose a category"),
  status: z.enum(["draft", "published", "needs_review"]),
  internalOwnerUserId: z.string().uuid().optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  logo_url: z.string().optional(),
  description: z.string().max(2000, "Description cannot exceed 2000 characters").optional().or(z.literal("")),
  twitter: z.string().max(255).optional().or(z.literal("")),
  linkedin: z.string().max(255).optional().or(z.literal("")),
  bluesky: z.string().max(255).optional().or(z.literal("")),
  instagram: z.string().max(255).optional().or(z.literal("")),
  contacts: z.array(sponsorContactSchema),
});

export type AdminSponsorValues = z.infer<typeof adminSponsorSchema>;

interface AdminSponsorFormProps {
  sponsor: AdminSponsorRecord;
  categories: Array<{ id: number; name: string }>;
  ownerOptions: Array<{ userId: string; label: string }>;
  submitMode?: "create" | "edit";
}

function toInputValue(value: string | null | undefined) {
  return value ?? "";
}

export function getContactDefaults(contacts: AdminSponsorFormProps["sponsor"]["contacts"]) {
  return (
    contacts
      ?.filter((contact): contact is NonNullable<typeof contact> => typeof contact?.email === "string" && contact.email.trim().length > 0)
      .map((contact) => ({
        email: toInputValue(contact.email).trim(),
        name: toInputValue(contact.name).trim(),
      })) ?? []
  );
}

function getDefaultValues(sponsor: AdminSponsorFormProps["sponsor"]): AdminSponsorValues {
  return {
    name: sponsor.name,
    edition: sponsor.edition,
    categoryId: sponsor.category_id ?? 0,
    status: sponsor.status ?? "published",
    internalOwnerUserId: toInputValue(sponsor.internal_owner_user_id),
    website: toInputValue(sponsor.website),
    logo_url: toInputValue(sponsor.logo_url),
    description: toInputValue(sponsor.description),
    twitter: toInputValue(sponsor.twitter),
    linkedin: toInputValue(sponsor.linkedin),
    bluesky: toInputValue(sponsor.bluesky),
    instagram: toInputValue(sponsor.instagram),
    contacts: getContactDefaults(sponsor.contacts),
  };
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="field-error">{message}</p> : null;
}

function GeneralSection({
  register,
  errors,
  logoUrl,
  onLogoChange,
  sponsorId,
}: {
  register: UseFormRegister<AdminSponsorValues>;
  errors: FieldErrors<AdminSponsorValues>;
  logoUrl?: string;
  onLogoChange: (url: string | null) => void;
  sponsorId: string | null;
}) {
  return (
    <>
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="name">Sponsor Name</label>
          <input id="name" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="form-group form-group-small">
          <label htmlFor="edition">Edition</label>
          <input id="edition" {...register("edition")} />
          <FieldError message={errors.edition?.message} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="website">Website</label>
          <input id="website" type="url" {...register("website")} placeholder="https://company.com" />
          <FieldError message={errors.website?.message} />
        </div>
        <div className="form-group flex-1">
          {sponsorId ? (
            <LogoUpload
              sponsorId={sponsorId}
              currentLogoUrl={logoUrl}
              onUploadSuccess={(url) => onLogoChange(url)}
              onRemove={() => onLogoChange(null)}
              supabase={createClient()}
            />
          ) : (
            <div className="form-group">
              <label>Company Logo</label>
              <p className="text-muted mb-0">Save the sponsor first to enable logo uploads.</p>
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register("description")} rows={5} />
        <FieldError message={errors.description?.message} />
      </div>
    </>
  );
}

function GovernanceSection({
  register,
  errors,
  categories,
  ownerOptions,
}: {
  register: UseFormRegister<AdminSponsorValues>;
  errors: FieldErrors<AdminSponsorValues>;
  categories: AdminSponsorFormProps["categories"];
  ownerOptions: AdminSponsorFormProps["ownerOptions"];
}) {
  return (
    <div className="form-row">
      <div className="form-group flex-1">
        <label htmlFor="categoryId">Category</label>
        <select id="categoryId" {...register("categoryId", { valueAsNumber: true })}>
          <option value="">Choose a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <FieldError message={errors.categoryId?.message} />
      </div>
      <div className="form-group flex-1">
        <label htmlFor="status">Status</label>
        <select id="status" {...register("status")}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="needs_review">Needs Review</option>
        </select>
        <FieldError message={errors.status?.message} />
      </div>
      <div className="form-group flex-1">
        <label htmlFor="internalOwnerUserId">Internal Owner</label>
        <select id="internalOwnerUserId" {...register("internalOwnerUserId")}>
          <option value="">Unassigned</option>
          {ownerOptions.map((opt) => (
            <option key={opt.userId} value={opt.userId}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SocialSection({ register, errors }: { register: UseFormRegister<AdminSponsorValues>; errors: FieldErrors<AdminSponsorValues> }) {
  return (
    <div className="social-grid">
      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn</label>
        <input id="linkedin" {...register("linkedin")} />
        <FieldError message={errors.linkedin?.message} />
      </div>
      <div className="form-group">
        <label htmlFor="twitter">Twitter / X</label>
        <input id="twitter" {...register("twitter")} />
        <FieldError message={errors.twitter?.message} />
      </div>
      <div className="form-group">
        <label htmlFor="bluesky">Bluesky</label>
        <input id="bluesky" {...register("bluesky")} />
        <FieldError message={errors.bluesky?.message} />
      </div>
      <div className="form-group">
        <label htmlFor="instagram">Instagram</label>
        <input id="instagram" {...register("instagram")} />
        <FieldError message={errors.instagram?.message} />
      </div>
    </div>
  );
}

export default function AdminSponsorForm({ sponsor, categories, ownerOptions, submitMode = "edit" }: AdminSponsorFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(sponsor.logo_url ?? undefined);
  const [magicLinkStates, setMagicLinkStates] = useState<Record<string, { isSending: boolean; sendSuccess: boolean; sendError: string | null }>>({});

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSponsorValues>({ resolver: zodResolver(adminSponsorSchema), defaultValues: getDefaultValues(sponsor) });

  const handleSendMagicLink = async (email: string) => {
    if (!sponsor.id) return;
    const contactId = `email-${email}`;
    setMagicLinkStates((prev) => ({ ...prev, [contactId]: { isSending: true, sendSuccess: false, sendError: null } }));
    try {
      const response = await fetch(`/api/admin/sponsors/${sponsor.id}/send-magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setMagicLinkStates((prev) => ({ ...prev, [contactId]: { isSending: false, sendSuccess: false, sendError: data.error || "Failed" } }));
      } else {
        setMagicLinkStates((prev) => ({ ...prev, [contactId]: { isSending: false, sendSuccess: true, sendError: null } }));
        setTimeout(
          () =>
            setMagicLinkStates((prev) => {
              const { [contactId]: removedContact, ...remaining } = prev;
              void removedContact;
              return remaining;
            }),
          3000
        );
      }
    } catch {
      setMagicLinkStates((prev) => ({ ...prev, [contactId]: { isSending: false, sendSuccess: false, sendError: "Network error" } }));
    }
  };

  const onSubmit = async (values: AdminSponsorValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await fetch(submitMode === "create" ? "/api/admin/sponsors" : `/api/admin/sponsors/${sponsor.id}`, {
        method: submitMode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, logo_url: logoUrl }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Failed to update sponsor");
      }
      const payload = (await response.json()) as { sponsorId?: string };
      if (submitMode === "create" && payload.sponsorId) {
        router.push(`/admin/sponsors/${payload.sponsorId}`);
        router.refresh();
        return;
      }
      setSuccessMessage("Sponsor updated successfully.");
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to update sponsor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sponsor-form-container admin-sponsor-form">
      {errorMessage && <div className="error-alert">{errorMessage}</div>}
      {successMessage && <div className="success-alert">{successMessage}</div>}
      <GeneralSection register={register} errors={errors} logoUrl={logoUrl} onLogoChange={(url) => setLogoUrl(url ?? undefined)} sponsorId={sponsor.id} />
      <GovernanceSection register={register} errors={errors} categories={categories} ownerOptions={ownerOptions} />
      <SocialSection register={register} errors={errors} />
      <ContactsSection
        control={control}
        register={register}
        errors={errors}
        sponsorId={sponsor.id}
        magicLinkStates={magicLinkStates}
        onSendMagicLink={handleSendMagicLink}
      />
      <div className="form-actions">
        <Link href="/admin/sponsors" className="action-button secondary">
          Back to Sponsors
        </Link>
        <button type="submit" className="action-button primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitMode === "create" ? "Create Sponsor" : "Save Sponsor"}
        </button>
      </div>
    </form>
  );
}
