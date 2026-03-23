import ContactForm from "@/components/forms/ContactForm";
import CTASection from "@/components/sections/CTASection";
import PageHeader from "@/components/layout/PageHeader";
import { getCurrentEditionConfig } from "@/config/editions";
import { generateOrganizationSchema, serializeJsonLd } from "@/lib/shared/jsonld";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the DevBcn team. Have questions about the conference, sponsorship, or speaking? We're here to help.",
  keywords: ["contact", "DevBcn", "support", "sponsorship inquiry", "speaker support"],
};

export default function Contact() {
  const config = getCurrentEditionConfig();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <Script id="contact-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }} />
      <div>
        <PageHeader title="Contact Us" breadcrumbText="Contact Us" backgroundImageId={12} contentColClass="col-lg-6" />
        {/* ===== HERO AREA ENDS =======*/}
        {/* ===== CONTACT AREA STARTS =======*/}
        <div className="contact-inner-section sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="img1 image-anime">
                  <img src="/assets/img/all-images/contact/contact-img4.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
                <div className="contact4-boxarea">
                  <h3 className="text-anime-style-3">Get In Touch Now</h3>
                  <div className="space8" />
                  <ContactForm email={config.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ===== CONTACT AREA ENDS =======*/}
        {/* ===== CONTACT AREA STARTS =======*/}
        <div className="contact2-bg-section">
          <div className="img1">
            <img src="/assets/img/all-images/contact/contact-img1.png" alt="" className="contact-img1" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="space48" />
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={900}>
                      <div className="icons">
                        <img src="/assets/img/icons/mail1.svg" alt="" />
                      </div>
                      <div className="text">
                        <h5>Our Email</h5>
                        <div className="space14" />
                        <Link href={`mailto:${config.email}`}>{config.email}</Link>
                      </div>
                    </div>
                    <div className="space18" />
                    <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="icons">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                      </div>
                      <div className="text">
                        <h5>our location</h5>
                        <div className="space14" />
                        <Link href={config.venue.mapUrl} target="_blank">
                          {config.venue.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="space20 d-md-none d-block" />
                    <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="icons">
                        <img src="/assets/img/icons/phn1.svg" alt="" />
                      </div>
                      <div className="text">
                        <h5>Call/Message</h5>
                        <div className="space14" />
                        <Link href="/tel:+34931234567">+34 931 234 567</Link>
                      </div>
                    </div>
                    <div className="space18" />
                    <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1200}>
                      <div className="icons">
                        <img src="/assets/img/icons/instagram.svg" alt="" />
                      </div>
                      <div className="text">
                        <h5>Instagram</h5>
                        <div className="space14" />
                        <Link href={config.socialLinks.instagram || "#"}>devbcn.conf</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                src={config.venue.mapUrl}
                title="Venue Location Map"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="space100 d-lg-block d-none" />
        <div className="space50 d-lg-none d-block" />
        <CTASection
          ticketUrl={config.tickets.url}
          eventStartDate={config.event.startDay}
          eventEndDate={config.event.endDay}
          eventLocation={config.venue}
          showCountdown={config.showCountdown}
        />
      </div>
    </>
  );
}
