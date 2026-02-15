"use client";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import VideoModal from "@/components/elements/VideoModal";
import { useState } from "react";
import BlogReadMore from "./BlogReadMore";
import BlogSingleCTA from "./BlogSingleCTA";
import BlogSingleContent from "./BlogSingleContent";
import BlogSingleSidebar from "./BlogSingleSidebar";

export default function BlogSingle() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <PageHeader title="Blog Details" breadcrumbText="Blog Details" backgroundImageId={14} contentColClass="col-lg-6" />
          {/* ===== HERO AREA ENDS =======*/}
          {/* ===== BLOG AREA STARTS =======*/}
          <div className="blog-details-section sp8">
            <div className="container">
              <div className="row">
                <BlogSingleContent onPlay={() => setOpen(true)} />
                <BlogSingleSidebar />
              </div>
            </div>
          </div>
          {/* ===== BLOG AREA ENDS =======*/}
          {/* ===== BLOG AREA STARTS =======*/}
          <BlogReadMore />
          {/* ===== BLOG AREA ENDS =======*/}
          {/* ===== CTA AREA STARTS =======*/}
          <BlogSingleCTA />
          {/* ===== CTA AREA ENDS =======*/}
        </div>
        <VideoModal
          channel="youtube"
          isOpen={isOpen}
          videoId="JXMWOmuR1hU"
          onClose={() => setOpen(false)}
          aria={{ openMessage: "Video modal opened", dismissBtnMessage: "Close video modal" }}
          allowFullScreen={true}
          ratio="16:9"
          animationSpeed={300}
          classNames={{
            modalVideo: "modal-video",
            modalVideoClose: "modal-video-close",
            modalVideoBody: "modal-video-body",
            modalVideoInner: "modal-video-inner",
            modalVideoIframeWrap: "modal-video-movie-wrap",
            modalVideoCloseBtn: "modal-video-close-btn",
            modalVideoEffect: "modal-video-effect",
          }}
        />
      </Layout>
    </>
  );
}
