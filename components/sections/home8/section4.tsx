import BrandSlider from "@/components/slider/BrandSlider";
import { Sponsors } from "@/config/editions/types";
import Link from "next/link";
import Image from "next/image";
import { SponsorGroup } from "./SponsorGroup";

interface Section4Props {
  sponsors: Sponsors;
  eventVenue: { name: string; mapUrl: string };
}

export default function Section4({ sponsors, eventVenue }: Readonly<Section4Props>) {
  const hasSponsors = sponsors && Object.values(sponsors).some((arr) => arr && arr.length > 0);

  return (
    <div
      id="sponsors"
      className="brands8-section-area sp8"
      style={{
        backgroundImage: "url(/assets/img/bg/header-bg20.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image src="/assets/img/elements/layer1.png" className="layer1" alt="" fill priority />
      <div className="container">
        {!hasSponsors && (
          <>
            <div className="row">
              <div className="col-lg-5 m-auto">
                <div className="brand-header heading4 space-margin60 text-center">
                  <h3 className="sponsors-section-heading">Trusted by leading tech companies</h3>
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

            <SponsorGroup title="Top" items={sponsors.top} sizeClass="col-lg-4 col-md-6 mb-4" />
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
                      <Image src="/assets/img/icons/mail1.svg" alt="" width={40} height={40} />
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
                      <h5>X/ Twitter</h5>
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
              title={eventVenue.name}
              src={eventVenue.mapUrl}
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
  );
}
