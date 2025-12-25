import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";

export default function SpeakerNotFound() {
  return (
    <div>
      <PageHeader title="Speaker Not Found" breadcrumbText="404" />
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="error-content">
          <h2 style={{ fontSize: "48px", marginBottom: "20px", color: "#1a1a1a" }}>Speaker Not Found</h2>
          <p style={{ fontSize: "18px", marginBottom: "40px", color: "#666" }}>The speaker you're looking for doesn't exist or has been removed.</p>
          <div className="actions" style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/2026/speakers"
              className="btn btn-primary"
              style={{
                padding: "12px 30px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            >
              View All Speakers
            </Link>
            <Link
              href="/2026"
              className="btn btn-secondary"
              style={{
                padding: "12px 30px",
                backgroundColor: "#6c757d",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
