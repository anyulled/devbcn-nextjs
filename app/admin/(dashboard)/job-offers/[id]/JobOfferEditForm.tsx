"use client";

import React, { useState } from "react";

interface JobOffer {
  id: string;
  title: string;
  location: string | null;
  url: string | null;
  text: string | null;
  sponsor_id: string;
  sponsor: {
    id: string;
    name: string;
    edition: string;
  };
}

interface JobOfferEditFormProps {
  jobOffer: JobOffer;
  currentSponsor: JobOffer["sponsor"];
}

export function JobOfferEditForm({ jobOffer, currentSponsor }: JobOfferEditFormProps) {
  const [formData, setFormData] = useState({
    title: jobOffer.title,
    location: jobOffer.location || "",
    url: jobOffer.url || "",
    text: jobOffer.text || "",
    sponsor_id: jobOffer.sponsor_id,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/job-offers/${jobOffer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update job offer");
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="admin-job-offer-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Job Offer Details</h3>

        <div className="form-row">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="sponsor_id">Sponsor</label>
          <div className="readonly-field">{currentSponsor?.name}</div>
        </div>

        <div className="form-row">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Barcelona, Remote, Hybrid" />
        </div>

        <div className="form-row">
          <label htmlFor="url">Job URL</label>
          <input type="url" id="url" name="url" value={formData.url} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-row">
          <label htmlFor="text">Description</label>
          <textarea id="text" name="text" value={formData.text} onChange={handleChange} rows={8} placeholder="Job description..." />
        </div>
      </div>

      {error && <div className="error-alert mb-4">{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
