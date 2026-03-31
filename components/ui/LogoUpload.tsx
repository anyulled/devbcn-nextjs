"use client";

import React, { useState, useRef } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { uploadSponsorLogo } from "@/lib/supabase/storage";

interface LogoUploadProps {
  sponsorId: string;
  currentLogoUrl?: string;
  onUploadSuccess: (url: string) => void;
  onRemove: () => void;
  supabase: SupabaseClient;
}

// 500 KB
const MAX_FILE_SIZE = 500 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export default function LogoUpload({ sponsorId, currentLogoUrl, onUploadSuccess, onRemove, supabase }: Readonly<LogoUploadProps>) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 500 KB limit.");
      return;
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Invalid file type. Please use PNG, JPEG, WEBP, or SVG.");
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadSponsorLogo(supabase, file, sponsorId);
      onUploadSuccess(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload logo.");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="form-group">
      <label>Company Logo</label>
      <div
        className={`logo-upload-container ${dragActive ? "dragging" : ""} ${error ? "has-error" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} onChange={onFileChange} accept={ALLOWED_TYPES.join(",")} className="hidden" style={{ display: "none" }} />

        {currentLogoUrl && !isUploading ? (
          <div className="logo-preview-wrapper" onClick={(e) => e.stopPropagation()}>
            <img src={currentLogoUrl} alt="Logo preview" className="logo-preview" />
            <button type="button" className="remove-logo" onClick={onRemove}>
              Remove Logo
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <i className={`fas ${isUploading ? "fa-spinner fa-spin" : "fa-cloud-upload-alt"}`}></i>
            <span className="upload-text">{isUploading ? "Uploading..." : "Click or drag logo to upload"}</span>
            <span className="upload-hint">PNG, JPG, WEBP, SVG (Max 500KB)</span>
          </div>
        )}

        {error && <p className="field-error mt-2">{error}</p>}
        {isUploading && <div className="upload-progress" style={{ width: "100%" }}></div>}
      </div>
    </div>
  );
}
