"use client";
import Countdown from "@/components/elements/Countdown";
import Image from "next/image";
import CountUp from "react-countup";

interface Section2Props {
  eventDate: string;
  showCountdown: boolean;
}

export default function Section2({ eventDate, showCountdown }: Section2Props) {
  return (
    <>
      <div
        className="about8-section-area"
        style={{
          backgroundImage: "url(assets/img/bg/header-bg20.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img src="/assets/img/elements/layer1.png" alt="" className="layer1" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="space50 d-lg-none d-block" />
              <div className="about8-images">
                <Image src="/assets/img/all-images/about/about-img10.png" alt="" className="about-img10 aniamtion-key-1" width={317} height={192} />
                <div className="img1" data-aos="zoom-in" data-aos-duration={1000}>
                  <Image src="/assets/img/all-images/about/devbcn2.webp" alt="DevBcn Conference" width={400} height={300} />
                </div>
                <div className="img2" data-aos="zoom-in" data-aos-duration={1100}>
                  <Image src="/assets/img/all-images/about/FaqsImage0.webp" alt="DevBcn Event" width={400} height={300} />
                </div>
                <div className="img3" data-aos="zoom-in" data-aos-duration={1200}>
                  <Image src="/assets/img/all-images/about/FaqsImage1.webp" alt="DevBcn Venue" width={400} height={300} />
                </div>
              </div>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-4">
              <div className="space60 d-lg-none d-block" />
              <div className="side-img1-area">
                {/* <img src="/assets/img/all-images/about/about-img21.png" alt=""> */}
                <div className="counter-box">
                  <h3>
                    <CountUp className="odometer" enableScrollSpy={true} end={70} />+
                  </h3>
                  <p>Speakers</p>
                </div>
                <div className="img1">
                  <Image src="/assets/img/all-images/about/about-img22.png" alt="" width={150} height={150} />
                </div>
                <div className="img2">
                  <Image src="/assets/img/all-images/about/about-img23.png" alt="" width={150} height={150} />
                </div>
                <div className="img3">
                  <Image src="/assets/img/all-images/about/about-img24.png" alt="" width={150} height={150} />
                </div>
                <div className="img4">
                  <Image src="/assets/img/all-images/about/about-img25.png" alt="" width={150} height={150} />
                </div>
                <div className="counter-box2">
                  <h3>
                    <CountUp className="odometer" enableScrollSpy={true} end={80} />+
                  </h3>
                  <p>Session</p>
                </div>
                <div className="counter-box3">
                  <h3>
                    <CountUp className="odometer" enableScrollSpy={true} end={800} />+
                  </h3>
                  <p>Attendance</p>
                </div>
                <div className="counter-box4">
                  <h3>
                    <CountUp className="odometer" enableScrollSpy={true} end={26} />+
                  </h3>
                  <p>Sponsors</p>
                </div>
              </div>
              <div className="div d-lg-none d-block" style={{ marginBottom: 200 }} />
            </div>
          </div>
        </div>
        <div className="others8-section-area sp1">
          <div className="container">{showCountdown && <Countdown style={2} eventDate={eventDate} />}</div>
        </div>
      </div>
    </>
  );
}
