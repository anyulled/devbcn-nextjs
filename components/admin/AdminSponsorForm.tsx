"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, type Control, type FieldArrayWithId, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const sponsorContactSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().max(255, "Name is too long").optional().or(z.literal("")),
});

const adminSponsorSchema = z.object({
  name: z.string().min(2, "Name is too short").max(255, "Name is too long"),
  edition: z.string().min(4, "Edition is required").max(50, "Edition is too long"),
  categoryId: z.number().int().positive("Choose a category"),
  status: z.enum(["draft", "published", "needs_review"]),
  internalOwnerUserId: z.string().uuid().optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  logo_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().max(2000, "Description cannot exceed 2000 characters").optional().or(z.literal("")),
  twitter: z.string().max(255).optional().or(z.literal("")),
  linkedin: z.string().max(255).optional().or(z.literal("")),
  bluesky: z.string().max(255).optional().or(z.literal("")),
  instagram: z.string().max(255).optional().or(z.literal("")),
  contacts: z.array(sponsorContactSchema),
});

type AdminSponsorValues = z.infer<typeof adminSponsorSchema>;

interface AdminSponsorFormProps {
  sponsor: {
    id: string;
    name: string;
    edition: string;
    category_id: number | null;
    status: "draft" | "published" | "needs_review" | null;
    internal_owner_user_id: string | null;
    website: string | null;
    logo_url: string | null;
    description: string | null;
    twitter: string | null;
    linkedin: string | null;
    bluesky: string | null;
    instagram: string | null;
    contacts: Array<{
      email: string | null;
      name: string | null;
    }> | null;
  };
  categories: Array<{
    id: number;
    name: string;
  }>;
  ownerOptions: Array<{
    userId: string;
    label: string;
  }>;
}

function toInputValue(value: string | null | undefined) {
  return value ?? "";
}

function getContactDefaults(contacts: AdminSponsorFormProps["sponsor"]["contacts"]) {
  return (
    contacts
      ?.filter((contact) => Boolean(contact.email))
      .map((contact) => ({
        email: toInputValue(contact.email),
        name: toInputValue(contact.name),
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

function FieldError({ message }: Readonly<{ message?: string }>) {
  return message ? <p className="field-error">{message}</p> : null;
}

function getContactError(errors: FieldErrors<AdminSponsorValues>, index: number) {
  if (!errors.contacts || !Array.isArray(errors.contacts)) {
    return undefined;
  }

  return errors.contacts.slice(index, index + 1)[0];
}

function GeneralSection({
  register,
  errors,
}: Readonly<{
  register: UseFormRegister<AdminSponsorValues>;
  errors: FieldErrors<AdminSponsorValues>;
}>) {
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
          <label htmlFor="logo_url">Logo URL</label>
          <input id="logo_url" type="url" {...register("logo_url")} placeholder="https://company.com/logo.png" />
          <FieldError message={errors.logo_url?.message} />
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
}: Readonly<{
  register: UseFormRegister<AdminSponsorValues>;
  errors: FieldErrors<AdminSponsorValues>;
  categories: AdminSponsorFormProps["categories"];
  ownerOptions: AdminSponsorFormProps["ownerOptions"];
}>) {
  return (
    <div className="form-row">
      <div className="form-group flex-1">
        <label htmlFor="categoryId">Category</label>
        <select id="categoryId" {...register("categoryId", { valueAsNumber: true })}>
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
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
          {ownerOptions.map((owner) => (
            <option key={owner.userId} value={owner.userId}>
              {owner.label}
            </option>
          ))}
        </select>
        <FieldError message={errors.internalOwnerUserId?.message} />
      </div>
    </div>
  );
}

function SocialSection({
  register,
  errors,
}: Readonly<{
  register: UseFormRegister<AdminSponsorValues>;
  errors: FieldErrors<AdminSponsorValues>;
}>) {
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

function ContactRow({
  field,
  index,
  register,
  remove,
  error,
}: Readonly<{
  field: FieldArrayWithId<AdminSponsorValues, "contacts", "id">;
  index: number;
  register: UseFormRegister<AdminSponsorValues>;
  remove: (index: number) => void;
  error?: FieldErrors<AdminSponsorValues["contacts"][number]>;
}>) {
  return (
    <div className="contact-row">
      <div className="form-group flex-1">
        <label htmlFor={`contact-email-${field.id}`}>Email</label>
        <input id={`contact-email-${field.id}`} type="email" {...register(`contacts.${index}.email`)} placeholder="name@company.com" />
        <FieldError message={error?.email?.message} />
      </div>

      <div className="form-group flex-1">
        <label htmlFor={`contact-name-${field.id}`}>Name</label>
        <input id={`contact-name-${field.id}`} {...register(`contacts.${index}.name`)} placeholder="Optional" />
        <FieldError message={error?.name?.message} />
      </div>

      <button type="button" className="icon-button delete" onClick={() => remove(index)} aria-label="Remove contact">
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
}

function ContactsSection({
  control,
  register,
  errors,
}: Readonly<{
  control: Control<AdminSponsorValues>;
  register: UseFormRegister<AdminSponsorValues>;
  errors: FieldErrors<AdminSponsorValues>;
}>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  return (
    <div className="contacts-section">
      <div className="section-heading">
        <div>
          <h3>Portal Contacts</h3>
          <p>These emails can access the sponsor portal with a magic link.</p>
        </div>
        <button type="button" className="action-button secondary" onClick={() => append({ email: "", name: "" })}>
          Add Contact
        </button>
      </div>

      <div className="contacts-grid">
        {fields.length === 0 && <p className="text-muted">No sponsor contacts configured yet.</p>}
        {fields.map((field, index) => (
          <ContactRow key={field.id} field={field} index={index} register={register} remove={remove} error={getContactError(errors, index)} />
        ))}
      </div>
    </div>
  );
}

export default function AdminSponsorForm({ sponsor, categories, ownerOptions }: Readonly<AdminSponsorFormProps>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSponsorValues>({
    resolver: zodResolver(adminSponsorSchema),
    defaultValues: getDefaultValues(sponsor),
  });

  const onSubmit = async (values: AdminSponsorValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/admin/sponsors/${sponsor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Failed to update sponsor");
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

      <GeneralSection register={register} errors={errors} />
      <GovernanceSection register={register} errors={errors} categories={categories} ownerOptions={ownerOptions} />
      <SocialSection register={register} errors={errors} />
      <ContactsSection control={control} register={register} errors={errors} />

      <div className="form-actions">
        <Link href="/admin/sponsors" className="action-button secondary">
          Back to Sponsors
        </Link>
        <button type="submit" className="action-button primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Sponsor"}
        </button>
      </div>
    </form>
  );
}
