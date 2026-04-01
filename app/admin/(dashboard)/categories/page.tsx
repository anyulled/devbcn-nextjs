import React from "react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories, error } = await supabase.from("sponsor_categories").select("*").order("max_job_offers", { ascending: false });

  return (
    <div className="admin-categories-page">
      <div className="admin-content-header">
        <h2>Sponsor Categories & Limits</h2>
        <p className="subtitle">Define how many job offers each sponsor tier can post</p>
      </div>

      {error ? (
        <div className="error-alert">Error loading categories: {error.message}</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Max Job Offers</th>
                <th>Sponsor Count</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td>
                    <span className="badge category">{category.name}</span>
                  </td>
                  <td>
                    <div className="limit-display">
                      <strong>{category.max_job_offers}</strong>
                      <span className="text-muted"> offers allowed</span>
                    </div>
                  </td>
                  <td>
                    <div className="sponsor-loading-count">
                      <span className="text-muted italic">Check Sponsors tab</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-info-card">
        <h4>
          <i className="fas fa-info-circle"></i> Understanding Limits
        </h4>
        <p>
          These limits are enforced in the <strong>Sponsor Portal</strong>. When a sponsor contact tries to create a new job offer, the system checks their
          category limit before allowing the submission.
        </p>
      </div>
    </div>
  );
}
