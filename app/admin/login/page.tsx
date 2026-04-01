"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.replace("/admin");
      router.refresh();
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-shell">
        <section className="admin-login-showcase">
          <span className="portal-kicker">DevBcn Control Layer</span>
          <h1>Admin access for sponsorship, job offers, and edition ops.</h1>
          <p>Use the internal portal to manage sponsor records and moderate the sponsor-facing workspace without the public site chrome getting in the way.</p>

          <div className="portal-metrics" aria-hidden="true">
            <div className="portal-metric">
              <strong>Internal</strong>
              <span>Backoffice only</span>
            </div>
            <div className="portal-metric">
              <strong>Secure</strong>
              <span>Role-gated access</span>
            </div>
            <div className="portal-metric">
              <strong>Focused</strong>
              <span>No public footer or distractions</span>
            </div>
          </div>
        </section>

        <div className="admin-login-card admin-login-card--admin">
          <div className="admin-login-header">
            <span className="portal-badge">Admin portal</span>
            <Image src="/assets/img/logo/logo.png" alt="DevBcn Logo" className="login-logo" width={160} height={54} />
            <h2>Sign in</h2>
            <p>Access sponsor management, categories, and global job offers.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="admin@devbcn.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Signing in..." : "Enter admin"}
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
