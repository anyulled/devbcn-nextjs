"use client";
import CountUp from "react-countup";
import Countdown from "@/components/elements/Countdown";
import Image from "next/image";

interface Section2Props {
  eventDate: string;
  showCountdown: boolean;
}

export default function Section2({ eventDate, showCountdown }: Readonly<Section2Props>) {
  return (
    <div className="conference-stats">
      {/* Background with reused image */}
      <div className="conference-stats__bg">
        <Image src="/assets/img/bg/header-bg20.png" alt="Background Texture" fill style={{ objectFit: "cover" }} priority />
      </div>

      <div className="container">
        <div className="conference-stats__content">
          {/* Intro Section */}
          <div className="conference-stats__intro" data-aos="fade-up" data-aos-duration="800">
            <h2>Where Developers Connect, Learn & Grow</h2>
            <p>
              Join us for the premier multi-track conference in Barcelona. Experience cutting-edge talks, hands-on workshops, and unparalleled networking
              opportunities with industry leaders and the community.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="conference-stats__grid">
            <div className="conference-stats__card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              <h3>
                <CountUp end={70} duration={2.5} enableScrollSpy />
                <span>+</span>
              </h3>
              <p>Speakers</p>
            </div>

            <div className="conference-stats__card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <h3>
                <CountUp end={80} duration={2.5} enableScrollSpy />
                <span>+</span>
              </h3>
              <p>Sessions</p>
            </div>

            <div className="conference-stats__card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
              <h3>
                <CountUp end={800} duration={2.5} enableScrollSpy />
                <span>+</span>
              </h3>
              <p>Attendees</p>
            </div>

            <div className="conference-stats__card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <h3>
                <CountUp end={26} duration={2.5} enableScrollSpy />
                <span>+</span>
              </h3>
              <p>Sponsors</p>
            </div>
          </div>

          {/* Countdown Section */}
          {showCountdown && (
            <div className="conference-stats__countdown" data-aos="fade-up" data-aos-duration="1200">
              <Countdown style={2} eventDate={eventDate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
