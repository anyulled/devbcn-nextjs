import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch some stats for the dashboard
  const { count: sponsorCount } = await supabase.from("sponsors").select("*", { count: "exact", head: true });

  const { count: jobOfferCount } = await supabase.from("job_offers").select("*", { count: "exact", head: true });

  const { count: categoryCount } = await supabase.from("sponsor_categories").select("*", { count: "exact", head: true });

  return (
    <div className="admin-dashboard-overview">
      <div className="admin-content-header">
        <h2>Dashboard Overview</h2>
        <div className="current-date">
          <i className="far fa-calendar-alt"></i> {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card cyan">
          <div className="stat-icon">
            <i className="fas fa-handshake"></i>
          </div>
          <div className="stat-info">
            <h3>Total Sponsors</h3>
            <span className="stat-number">{sponsorCount || 0}</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="stat-info">
            <h3>Active Job Offers</h3>
            <span className="stat-number">{jobOfferCount || 0}</span>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">
            <i className="fas fa-tags"></i>
          </div>
          <div className="stat-info">
            <h3>Categories</h3>
            <span className="stat-number">{categoryCount || 0}</span>
          </div>
        </div>
      </div>

      <section className="recent-activity">
        <h3>System Quick Links</h3>
        <div className="quick-links-grid">
          <Link href="/admin/sponsors" className="quick-link">
            <i className="fas fa-plus-circle"></i>
            <span>Add New Sponsor</span>
          </Link>
          <Link href="/admin/categories" className="quick-link">
            <i className="fas fa-cog"></i>
            <span>Edit Categories</span>
          </Link>
          <a href="/" target="_blank" className="quick-link" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt"></i>
            <span>View Public Site</span>
          </a>
        </div>
      </section>
    </div>
  );
}
