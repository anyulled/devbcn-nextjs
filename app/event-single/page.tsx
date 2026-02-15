"use client";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import EventSingleCTA from "./EventSingleCTA";
import EventSingleHeroSection from "./EventSingleHeroSection";
import EventSingleTabsSection from "./EventSingleTabsSection";
export default function EventSingle() {
  const [isTab, setIsTab] = useState(1);
  const handleTab = (i: number) => {
    setIsTab(i);
  };
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <PageHeader title="Event single" breadcrumbText="Event single" backgroundImageId={9} contentColClass="col-lg-6" />
          {/* ===== HERO AREA ENDS =======*/}
          {/* ===== EVENT AREA STARTS =======*/}
          <EventSingleHeroSection />
          <EventSingleTabsSection activeTab={isTab} onTabChange={handleTab} />
          {/* ===== EVENT AREA ENDS =======*/}
          {/* ===== CTA AREA STARTS =======*/}
          <EventSingleCTA className="cta1-section-area d-lg-block d-block" />
          <EventSingleCTA className="cta1-section-area d-lg-none d-block" />
        </div>
      </Layout>
    </>
  );
}
