"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface JobOffer {
  id: string;
  title: string;
  location: string | null;
  url: string | null;
  text: string | null;
  created_at: string;
  sponsor_id: string;
  sponsor: {
    name: string;
    edition: string;
  } | null;
}

interface JobOffersClientProps {
  jobOffers: JobOffer[];
  availableYears: string[];
}

export function JobOffersClient({ jobOffers, availableYears }: JobOffersClientProps) {
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const filteredJobOffers = useMemo(() => {
    if (selectedYear === "all") {
      return jobOffers;
    }
    return jobOffers.filter((offer) => offer.sponsor?.edition === selectedYear);
  }, [jobOffers, selectedYear]);

  const getJobCountForYear = (year: string) => {
    if (year === "all") {
      return jobOffers.length;
    }
    return jobOffers.filter((offer) => offer.sponsor?.edition === year).length;
  };

  return (
    <div className="job-offers-client">
      <div className="filters-section">
        <label htmlFor="year-filter" className="filter-label">
          Filter by Year:
        </label>
        <select id="year-filter" className="year-filter-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="all">All Years ({getJobCountForYear("all")})</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year} ({getJobCountForYear(year)})
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Edition</th>
              <th>Sponsor</th>
              <th>Title</th>
              <th>Location</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobOffers.map((offer) => (
              <tr key={offer.id}>
                <td className="edition-cell">
                  <strong>{offer.sponsor?.edition}</strong>
                </td>
                <td>{offer.sponsor?.name}</td>
                <td>
                  <strong>{offer.title}</strong>
                </td>
                <td>{offer.location || "Remote/TBD"}</td>
                <td className="date-cell" suppressHydrationWarning>{new Date(offer.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <Link href={`/admin/job-offers/${offer.id}`} className="btn-icon" title="Edit job offer">
                      <i className="fas fa-pen"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {filteredJobOffers.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-table-cell">
                  {selectedYear === "all" ? "No job offers found in the system." : `No job offers found for ${selectedYear}.`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="results-summary">
        Showing {filteredJobOffers.length} of {jobOffers.length} job offers
        {selectedYear !== "all" && ` for ${selectedYear}`}
      </div>
    </div>
  );
}
