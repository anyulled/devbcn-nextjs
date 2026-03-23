import AboutCounter from "@/components/elements/AboutCounter";
import PageHeader from "@/components/layout/PageHeader";
import BrandSlider from "@/components/slider/BrandSlider";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import { getEditionConfig } from "@/config/editions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DevBcn",
  description: "Learn more about DevBcn, the premier software development conference.",
};

export default function About() {
  const eventData = getEditionConfig("2026");
  return (
    <div>
      <PageHeader title="About DevBcn" breadcrumbText="About DevBcn" backgroundImageId={5} contentColClass="col-lg-8" />
      <div className="about1-section-area sp1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-imges">
                <div className="img1 reveal image-anime">
                  <Image src="/assets/img/all-images/about/about-img1.png" alt="DevBcn" width={600} height={600} />
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="space30" />
                    <div className="img1 reveal image-anime">
                      <Image src="/assets/img/all-images/about/about-img2.png" alt="Speakers 1" width={600} height={600} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="space30" />
                    <div className="img1 reveal image-anime">
                      <Image src="/assets/img/all-images/about/about-img3.png" alt="Speakers 2" width={600} height={600} />
                    </div>
                  </div>
                </div>
                <div className="about-btnarea">
                  <svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200" fill="none" className="keyframe5">
                    <path
                      d="M93.8771 2.53621C96.8982 1.28483 98.4087 0.659138 100 0.659138C101.591 0.659138 103.102 1.28483 106.123 2.5362L164.588 26.7531C167.609 28.0045 169.119 28.6302 170.245 29.7554C171.37 30.8806 171.995 32.3912 173.247 35.4123L197.464 93.8771C198.715 96.8982 199.341 98.4087 199.341 100C199.341 101.591 198.715 103.102 197.464 106.123L173.247 164.588C171.995 167.609 171.37 169.119 170.245 170.245C169.119 171.37 167.609 171.995 164.588 173.247L106.123 197.464C103.102 198.715 101.591 199.341 100 199.341C98.4087 199.341 96.8982 198.715 93.8771 197.464L35.4123 173.247C32.3912 171.995 30.8806 171.37 29.7554 170.245C28.6302 169.119 28.0045 167.609 26.7531 164.588L2.53621 106.123C1.28483 103.102 0.659138 101.591 0.659138 100C0.659138 98.4087 1.28483 96.8982 2.5362 93.8771L26.7531 35.4123C28.0045 32.3912 28.6302 30.8806 29.7554 29.7554C30.8806 28.6302 32.3912 28.0045 35.4123 26.7531L93.8771 2.53621Z"
                      fill="#FFBA00"
                    />
                  </svg>
                  <Link href={`/${eventData.edition}/pricing-plan`}>
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                    <br />
                    <div className="space12" />
                    Buy Ticket
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-header-area heading2">
                <h5 data-aos="fade-left" data-aos-duration={800}>
                  about Barcelona Developers Conference
                </h5>
                <div className="space16" />
                <h2 className="text-anime-style-3">Explore Future Of Software Development At Our Yearly Conference</h2>
                <div className="space16" />
                <p data-aos="fade-left" data-aos-duration={900}>
                  The Yearly Software Development Conferences designed to challenge, Event inspire, and push the boundaries of what is possible in software
                  development. From emerging technologies to sustainable software development practices.
                </p>
                <div className="space32" />
                <AboutCounter />
                <div className="space32" />
                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
                  <Link href={eventData.tickets.url} className="vl-btn1">
                    Buy Ticket
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="brands3-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 m-auto">
              <div className="brand-header heading4 space-margin60 text-center">
                <h3>Top leading companies supported us</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" data-aos="zoom-in" data-aos-duration={800}>
              <BrandSlider />
            </div>
          </div>
        </div>
      </div>

      <div className="choose-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="heading2 text-center space-margin60">
                <h5>why choose us</h5>
                <div className="space18" />
                <h2>Why Attend DevBcn?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <Image src="/assets/img/icons/choose-icons1.svg" alt="" width={50} height={50} />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href="/event-single">Make Ideas Happen</Link>
                  <div className="space16" />
                  <p>DevBcn brings together the brightest minds and industry leaders for best of transformative business.</p>
                  <div className="space24" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <Image src="/assets/img/icons/choose-icons1.svg" alt="" width={50} height={50} />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href="/event-single">Great Speakers</Link>
                  <div className="space16" />
                  <p>Whether you're looking to elevate your business strategy, discover the latest industry trends, or connect.</p>
                  <div className="space24" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <Image src="/assets/img/icons/choose-icons1.svg" alt="" width={50} height={50} />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href="/event-single">Two Day Ticket</Link>
                  <div className="space16" />
                  <p>We empower businesses to thrive in an ever-evolving marketplace. This conference more than just an event.</p>
                  <div className="space24" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <Image src="/assets/img/icons/choose-icons1.svg" alt="" width={50} height={50} />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href="/event-single">Develop Your Skills</Link>
                  <div className="space16" />
                  <p>DevBcn is your gateway to future of software development. By bringing together best experts from various sectors.</p>
                  <div className="space24" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <Image src="/assets/img/icons/choose-icons1.svg" alt="" width={50} height={50} />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href="/event-single">Entry Verification</Link>
                  <div className="space16" />
                  <p>You'll walk away with better understanding of emerging trends and actionable strategies that can boost your career.</p>
                  <div className="space24" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <Image src="/assets/img/icons/choose-icons1.svg" alt="" width={50} height={50} />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href="/event-single">Workshops Offer</Link>
                  <div className="space16" />
                  <p>Designed for forward-thinking and professionals, this event delivers the tools, connections, and insights you.</p>
                  <div className="space24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection
        ticketUrl={eventData.tickets.url}
        eventStartDate={eventData.event.startDay}
        eventEndDate={eventData.event.endDay}
        eventLocation={eventData.venue}
        showCountdown={eventData.showCountdown}
      />
    </div>
  );
}
