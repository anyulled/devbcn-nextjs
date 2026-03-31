"use client";

import React, { useState } from "react";
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
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src="/assets/img/logo/logo.png" alt="DevBcn Logo" className="login-logo" />
          <h1>Sponsor Access</h1>
          <p>Login to manage your company profile and job offers</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="contact@yourcompany.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Sending link..." : "Send Magic Link"}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>&copy; {new Date().getFullYear()} Barcelona Developers Conference</p>
        </div>
      </div>
    </div>
  );
}
