import React from "react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister, type FieldArrayWithId } from "react-hook-form";
import type { AdminSponsorValues } from "./AdminSponsorForm";

interface ContactRowProps {
  field: FieldArrayWithId<AdminSponsorValues, "contacts", "id">;
  index: number;
  register: UseFormRegister<AdminSponsorValues>;
  remove: (index: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  sponsorId?: string;
  onSendMagicLink: (email: string) => void;
  isSending: boolean;
  sendSuccess: boolean;
  sendError: string | null;
}

function getMagicLinkKey(email: string) {
  return `email-${email}`;
}

function renderMagicLinkActions({
  showMagicLink,
  onSendMagicLink,
  emailValue,
  isSending,
  sendSuccess,
  sendError,
  remove,
  index,
}: {
  showMagicLink: boolean;
  onSendMagicLink: (email: string) => void;
  emailValue: string;
  isSending: boolean;
  sendSuccess: boolean;
  sendError: string | null;
  remove: (index: number) => void;
  index: number;
}) {
  if (!showMagicLink) {
    return (
      <button type="button" className="icon-button delete" onClick={() => remove(index)} aria-label="Remove contact">
        <i className="fas fa-trash-alt"></i>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className={`icon-button magic-link ${sendSuccess ? "success" : ""}`}
        onClick={() => onSendMagicLink(emailValue)}
        disabled={isSending}
        title="Send magic link"
        aria-label="Send magic link"
      >
        {isSending ? <i className="fas fa-spinner fa-spin"></i> : sendSuccess ? <i className="fas fa-check"></i> : <i className="fas fa-envelope"></i>}
      </button>
      {sendError && <span className="magic-link-error">{sendError}</span>}
      <button type="button" className="icon-button delete" onClick={() => remove(index)} aria-label="Remove contact">
        <i className="fas fa-trash-alt"></i>
      </button>
    </>
  );
}

function renderContactRow({ field, index, register, remove, error, sponsorId, onSendMagicLink, isSending, sendSuccess, sendError }: ContactRowProps) {
  const emailValue = field.email;
  const showMagicLink = !!(sponsorId && emailValue);

  const actions = renderMagicLinkActions({
    showMagicLink,
    onSendMagicLink,
    emailValue,
    isSending,
    sendSuccess,
    sendError,
    remove,
    index,
  });

  return (
    <div className="contact-row">
      <div className="form-group flex-1">
        <label htmlFor={`contact-email-${field.id}`}>Email</label>
        <input id={`contact-email-${field.id}`} type="email" {...register(`contacts.${index}.email`)} placeholder="name@company.com" />
        {error?.email?.message && <p className="field-error">{error.email.message}</p>}
      </div>
      <div className="form-group flex-1">
        <label htmlFor={`contact-name-${field.id}`}>Name</label>
        <input id={`contact-name-${field.id}`} {...register(`contacts.${index}.name`)} placeholder="Optional" />
        {error?.name?.message && <p className="field-error">{error.name.message}</p>}
      </div>
      <div className="contact-actions">{actions}</div>
    </div>
  );
}

function renderContactRowNoMagic({
  field,
  index,
  register,
  remove,
  error,
}: Omit<ContactRowProps, "sponsorId" | "onSendMagicLink" | "isSending" | "sendSuccess" | "sendError">) {
  return (
    <div className="contact-row">
      <div className="form-group flex-1">
        <label htmlFor={`contact-email-${field.id}`}>Email</label>
        <input id={`contact-email-${field.id}`} type="email" {...register(`contacts.${index}.email`)} placeholder="name@company.com" />
        {error?.email?.message && <p className="field-error">{error.email.message}</p>}
      </div>
      <div className="form-group flex-1">
        <label htmlFor={`contact-name-${field.id}`}>Name</label>
        <input id={`contact-name-${field.id}`} {...register(`contacts.${index}.name`)} placeholder="Optional" />
        {error?.name?.message && <p className="field-error">{error.name.message}</p>}
      </div>
      <div className="contact-actions">
        <button type="button" className="icon-button delete" onClick={() => remove(index)} aria-label="Remove contact">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export { renderContactRow, renderContactRowNoMagic };

interface ContactsSectionProps {
  control: Control<AdminSponsorValues>;
  register: UseFormRegister<AdminSponsorValues>;
  errors: FieldErrors<AdminSponsorValues>;
  sponsorId?: string;
  magicLinkStates: Record<string, { isSending: boolean; sendSuccess: boolean; sendError: string | null }>;
  onSendMagicLink: (email: string) => void;
}

export function ContactsSection({ control, register, errors, sponsorId, magicLinkStates, onSendMagicLink }: ContactsSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "contacts" });

  const getContactError = (idx: number) => {
    const errs = errors.contacts;
    if (!errs || !Array.isArray(errs)) return undefined;
    return errs[idx];
  };

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
        {fields.map((field, index) => {
          const email = field.email;
          const key = email ? getMagicLinkKey(email) : null;
          const state = key ? magicLinkStates[key] : undefined;

          if (sponsorId && email) {
            return renderContactRow({
              field,
              index,
              register,
              remove,
              error: getContactError(index),
              sponsorId,
              onSendMagicLink,
              isSending: state?.isSending ?? false,
              sendSuccess: state?.sendSuccess ?? false,
              sendError: state?.sendError ?? null,
            });
          }

          return renderContactRowNoMagic({
            field,
            index,
            register,
            remove,
            error: getContactError(index),
          });
        })}
      </div>
    </div>
  );
}
