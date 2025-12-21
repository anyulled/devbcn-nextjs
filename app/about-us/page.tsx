import { aboutData } from "@/data/AboutData";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div>
      <div
        className="inner-page-header"
        style={{ backgroundImage: "url(/assets/img/bg/header-bg15.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-9 m-auto">
              <div className="heading1 text-center">
                <h1>About Us</h1>
                <div className="space20" />
                <Link href="/">
                  Home <i className="fa-solid fa-angle-right" />{" "}
                  <span>About Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team6-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="team-heading heading9 text-center space-margin60">
                <h5>
                  <img src="/assets/img/icons/sub-logo1.svg" alt="" />
                  ABOUT US
                </h5>
                <div className="space20" />
                <h2 className="text-anime-style-3">Meet Our Team</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {aboutData.map((member, index) => (
              <div
                key={member.name}
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-duration={900 + index * 100}
              >
                <div className="team-widget-area">
                  <div className="img1 image-anime">
                    <img src={member.profileUrl.toString()} alt={member.name} />
                  </div>
                  <div className="img2">
                    <img
                      src={`/assets/img/elements/brand-img${(index % 4) + 1}.png`}
                      alt=""
                    />
                  </div>
                  <div className="content-area">
                    <Link href={member.twitterUrl.toString()}>
                      {member.name}
                    </Link>
                    <div className="space12" />
                    <p>{member.job}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
