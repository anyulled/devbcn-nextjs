import PageHeader from "@/components/layout/PageHeader";
import BlogCTA from "./BlogCTA";
import BlogListSection from "./BlogListSection";
export default function Blog() {
  return (
    <div>
      <PageHeader title="Our Blog" breadcrumbText="Our Blog" backgroundImageId={13} contentColClass="col-lg-6" />
      {/* ===== HERO AREA ENDS =======*/}
      {/* ===== BLOG AREA STARTS =======*/}
      <BlogListSection />
      {/* ===== BLOG AREA ENDS =======*/}
      {/* ===== CTA AREA STARTS =======*/}
      <BlogCTA className="cta1-section-area d-lg-block d-block" />
      {/* ===== CTA AREA ENDS =======*/}
      {/* ===== CTA AREA STARTS =======*/}
      <BlogCTA className="cta1-section-area d-lg-none d-block" />
    </div>
  );
}
