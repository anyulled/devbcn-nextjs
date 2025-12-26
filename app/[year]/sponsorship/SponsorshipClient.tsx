"use client";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange } from "@/config/editions";
import { format } from "date-fns";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".owl-next",
    prevEl: ".owl-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
};

const sponsorImages = [
  "https://live.staticflickr.com/65535/53799782744_e5f0e2ba22_c_d.jpg",
  "https://live.staticflickr.com/65535/53799461711_097dea1753_c_d.jpg",
  "https://live.staticflickr.com/65535/53799461481_fa62bd6586_c_d.jpg",
  "https://live.staticflickr.com/65535/53799462836_14bebbe191_c_d.jpg",
  "https://live.staticflickr.com/65535/53799696478_dce254ec4d_c_d.jpg",
  "https://live.staticflickr.com/65535/53798524497_1b90d60ced_c_d.jpg",
  "https://live.staticflickr.com/65535/53799783184_03bca3913b_c_d.jpg",
  "https://live.staticflickr.com/65535/53799696058_f73315dcfb_c_d.jpg",
  "https://live.staticflickr.com/65535/53799782919_5b588a8077_c_d.jpg",
];

interface SponsorshipClientProps {
  year: string;
  config: any; // Using any as requested to avoid 'any' types later, but for now I'll just match the structure
}

export default function SponsorshipClient({ year, config }: SponsorshipClientProps) {
  return (
    <div>
      <PageHeader title="Sponsorship" backgroundImageId={9} breadcrumbText="Sponsorship" />

      <div className="event-sidepage-section-area sp8">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="event-side-images">
                <div className="space24" />
                <div className="team-slider-area8">
                  <Swiper {...swiperOptions} className="owl-carousel">
                    {sponsorImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="img1 image-anime">
                          <img
                            src={image}
                            alt={`DevBcn ${year} - sponsors ${index + 1}`}
                            width="540"
                            height="360"
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="owl-nav">
                    <button type="button" role="presentation" className="owl-prev h1p">
                      <i className="fa-solid fa-angle-left" />
                    </button>
                    <button type="button" role="presentation" className="owl-next h1n">
                      <i className="fa-solid fa-angle-right" />
                    </button>
                  </div>
                </div>
                <div className="space32" />
                <h3>Mark Your Calendars!</h3>
                <div className="space16" />
                <p>
                  DevBcn <strong>{year}</strong> is set for{" "}
                  <strong>
                    {format(new Date(config.event.startDay), "MMMM do")} —{" ".concat(format(new Date(config.event.endDay), "do"))}
                  </strong>{" "}
                  at the iconic {config.venue}. This year, we're diving deep into the realms of Java, JVM, Cloud, DevOps, Frontend technologies, Leadership
                  strategies, and groundbreaking advancements in Big Data and AI.
                </p>

                <div className="space40" />
                <h4>A New Era of Tech Innovation</h4>
                <div className="space16" />
                <p>
                  Dive into tracks covering Java, JVM, Cloud, DevOps, Frontend technologies, Leadership, Big Data, AI, and more. DevBcn {year} is the perfect
                  stage to connect with tech professionals, thought leaders, and innovators.
                </p>

                <div className="space40" />
                <h4>Tailored Sponsorship Opportunities</h4>
                <div className="space16" />
                <p>
                  While we're keeping the details of our sponsorship packages exclusive, we promise they're more engaging and impactful than ever. Curious?
                  Access our{" "}
                  <strong>
                    <Link href={config.brochure} target="_blank" rel="noreferrer">
                      detailed brochure
                    </Link>
                  </strong>{" "}
                  and discover the myriad of ways you can shine at DevBcn {year}.
                </p>

                <div className="space24" />
                <div className="btn-area1">
                  <Link href={config.brochure} target="_blank" rel="noreferrer" className="vl-btn1">
                    <span className="demo">Get the Brochure</span>
                  </Link>
                </div>

                <div className="space40" />
                <h4>Why Partner with DevBcn?</h4>
                <div className="space16" />
                <ul>
                  <li>
                    <strong>Expand Your Reach:</strong> Engage with a diverse, tech-savvy audience. Our latest edition held more than 800 attendees.
                  </li>
                  <li>
                    <strong>Elevate Your Brand:</strong> Showcase your products and innovations in a dynamic environment.
                  </li>
                  <li>
                    <strong>Network with the Best:</strong> Connect with industry leaders and potential collaborators. Nearly 30 companies have pledged their
                    trust in DevBcn.
                  </li>
                  <li>
                    <strong>Showcase Thought Leadership:</strong> Share your expertise and insights with a global audience.
                  </li>
                </ul>

                <div className="space40" />

                <div className="space40" />
                <h4>Join us on this exciting journey</h4>
                <div className="space16" />
                <p>
                  To discuss how we can align our sponsorship opportunities with your brand's vision, contact us at{" "}
                  <Link href="mailto:sponsors@devbcn.com">sponsors@devbcn.com</Link>
                </p>

                <div className="space24" />
                <p>
                  Let's make DevBcn {year} an unforgettable experience together! Stay updated and spread the excitement using{" "}
                  <Link href={`https://twitter.com/hashtag/devbcn${year.substring(2)}?src=hashtag_click`} target="_blank" rel="noreferrer">
                    #devbcn{year.substring(2)}
                  </Link>
                  .
                </p>

                <div className="space24" />
                <p>We eagerly await the opportunity to collaborate with you once more for an extraordinary event!</p>

                <div className="space40" />
                <h4>Take a look at our latest edition summary</h4>
                <div className="space24" />
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="450"
                      src="https://www.youtube.com/embed/AHWSu1WE288"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ border: 0 }}
                    />
                  </div>
                </div>

                <div className="space40" />
                <h4>Explore DevBcn Talks Online!</h4>
                <div className="space16" />
                <ul>
                  <li>
                    <Link rel="noreferrer" target="_blank" href="https://youtube.com/playlist?list=PLzJFNZtyAbyyfUadLCuSc-8CdHct8NeSa&si=7lgKQAtEncL-332O">
                      🎥 DevBcn 2025 - recorded sessions
                    </Link>
                  </li>
                  <li>
                    <Link rel="noreferrer" target="_blank" href="https://www.youtube.com/playlist?list=PLzJFNZtyAbyxg4LfdyFbcANJXDbilXjBB">
                      🎥 DevBcn 2024 - recorded sessions
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.youtube.com/playlist?list=PLzJFNZtyAbyzmAAKzx1COeIBEGFgPA_og" rel="noreferrer" target="_blank">
                      🎥 DevBcn 2023 - recorded sessions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTASection
        eventStartDate={new Date(config.event.startDay)}
        eventEndDate={new Date(config.event.endDay)}
        eventLocation={config.venue}
        ticketUrl={config.tickets.url}
        showCountdown={config.showCountdown}
      />
    </div>
  );
}
