import BrandSlider from "@/components/slider/BrandSlider";
import { Sponsors } from "@/config/editions/types";
import Link from "next/link";
import { SponsorGroup } from "./SponsorGroup";

interface Section4Props {
  sponsors: Sponsors;
}

export default function Section4({ sponsors }: Section4Props) {
  const hasSponsors = sponsors && Object.values(sponsors).some((arr) => arr && arr.length > 0);

  return (
    <>
      <div
        className="brands8-section-area sp8"
        style={{
          backgroundImage: "url(/assets/img/bg/header-bg20.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src="/assets/img/elements/layer1.png" alt="" className="layer1" />
        <div className="container">
          {!hasSponsors && (
            <>
              <div className="row">
                <div className="col-lg-5 m-auto">
                  <div className="brand-header heading4 space-margin60 text-center">
                    <h3>Join 20+ companies already growing</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12" data-aos="zoom-in" data-aos-duration={800}>
                  <BrandSlider />
                </div>
              </div>
            </>
          )}

          {hasSponsors && sponsors && (
            <div className="sponsors-list py-5">
              <div className="row">
                <div className="col-lg-8 m-auto">
                  <div className="heading4 text-center mb-5 space-margin60">
                    <h3 className="sponsors-section-heading">Our Sponsors</h3>
                  </div>
                </div>
              </div>

              <SponsorGroup title="Top" items={sponsors.top} sizeClass="col-lg-12 col-md-12 mb-4 d-flex justify-content-center" />
              <SponsorGroup title="Premium" items={sponsors.premium} sizeClass="col-lg-3 col-md-6 col-6 mb-4" />
              <SponsorGroup title="Regular" items={sponsors.regular} sizeClass="col-lg-2 col-md-4 col-4 mb-4" />
              <SponsorGroup title="Basic" items={sponsors.basic} sizeClass="col-lg-2 col-md-3 col-4 mb-4" />
              <SponsorGroup title="Communities" items={sponsors.communities} sizeClass="col-lg-2 col-md-3 col-4 mb-4" />
              <SponsorGroup title="Media Partners" items={sponsors.media_partners} sizeClass="col-lg-2 col-md-3 col-4 mb-4" />
              <SponsorGroup title="Supporters" items={sponsors.supporters} sizeClass="col-lg-2 col-md-3 col-4 mb-4" />
            </div>
          )}
        </div>
        <div className="space60" />
        <div className="contact8-bg-section">
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
                        <Link href="mailto:info@devbcn.com">info@devbcn.com</Link>
                      </div>
                    </div>
                    <div className="space18" />
                    <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="icons">
                        <i className="fa-brands fa-linkedin-in" />
                      </div>
                      <div className="text">
                        <h5>LinkedIn</h5>
                        <div className="space14" />
                        <a href="https://www.linkedin.com/company/devbcn/" target="_blank" rel="noopener noreferrer">
                          DevBcn
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="space20 d-md-none d-block" />
                    <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="icons">
                        <i className="fa-brands fa-twitter" />
                      </div>
                      <div className="text">
                        <h5>X/Formerly twitter</h5>
                        <div className="space14" />
                        <a href="https://twitter.com/dev_bcn" target="_blank" rel="noopener noreferrer">
                          @dev_bcn
                        </a>
                      </div>
                    </div>
                    <div className="space18" />
                    <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1200}>
                      <div className="icons">
                        <img src="/assets/img/icons/instagram.svg" alt="Instagram" />
                      </div>
                      <div className="text">
                        <h5>Instagram</h5>
                        <div className="space14" />
                        <a href="https://www.instagram.com/devbcn.conf/" target="_blank" rel="noopener noreferrer">
                          devbcn.conf
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space48" />
              </div>
            </div>
          </div>
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0089347896845!2d2.1750847!3d41.3755825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8f7c8f7%3A0x7c8f7c8f7c8f7c8f!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
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
      </div>
    </>
  );
}
