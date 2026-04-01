"use client";

import React, { useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

export default function SponsorLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleLogin: React.ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${globalThis.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the magic link to sign in!");
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-shell">
        <section className="admin-login-showcase">
          <span className="portal-kicker">Partner workspace</span>
          <h1>Sponsor tools with a tighter, quieter login flow.</h1>
          <p>Manage your company profile and job offers in a dedicated workspace built for sponsor contacts, without the public-site footer clutter.</p>

          <div className="portal-metrics" aria-hidden="true">
            <div className="portal-metric">
              <strong>Magic link</strong>
              <span>Passwordless entry</span>
            </div>
            <div className="portal-metric">
              <strong>Profile</strong>
              <span>Company details and branding</span>
            </div>
            <div className="portal-metric">
              <strong>Hiring</strong>
              <span>Job offers by edition</span>
            </div>
          </div>
        </section>

        <div className="admin-login-card admin-login-card--sponsor">
          <div className="admin-login-header">
            <span className="portal-badge">Sponsor access</span>
            <Image src="/assets/img/logo/logo.png" alt="DevBcn Logo" className="login-logo" width={160} height={54} />
            <h2>Get your magic link</h2>
            <p>Use your sponsor contact email to access the company workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="contact@yourcompany.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Sending link..." : "Send magic link"}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>&copy; {new Date().getFullYear()} Barcelona Developers Conference</p>
          </div>
        </div>
      </div>
    </div>
  );
}
