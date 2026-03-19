import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import SpeakerCTA from "./SpeakerCTA";
import SpeakerEventHistory from "./SpeakerEventHistory";
export default function SpeakersSingle() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeader title="speakers Details" breadcrumbText="Speakers Details" backgroundImageId={7} contentColClass="col-lg-6" />
        {/* ===== HERO AREA ENDS =======*/}
        {/* ===== TEAM AREA STARTS =======*/}
        <div className="team-details-section-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="speakers-details-box">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="our-team-boxarea">
                        <div className="team-widget-area">
                          <img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
                          <img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
                          <div className="img1">
                            <img src="/assets/img/all-images/team/team-img12.png" alt="" className="team-img4" />
                          </div>
                        </div>
                        <div className="content-area">
                          <Link href="/#">Adresy Ineasta</Link>
                          <div className="space16" />
                          <p>UI/UX Designer</p>
                          <div className="space24" />
                          <ul>
                            <li>
                              <Link href="/#" className="icon1">
                                <i className="fa-brands fa-facebook-f" />
                              </Link>
                            </li>
                            <li>
                              <Link href="/#" className="icon2">
                                <i className="fa-brands fa-linkedin-in" />
                              </Link>
                            </li>
                            <li>
                              <Link href="/#" className="icon3">
                                <i className="fa-brands fa-instagram" />
                              </Link>
                            </li>
                            <li>
                              <Link href="/#" className="icon4">
                                <i className="fa-brands fa-pinterest-p" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="speakesr-details-content heading2">
                        <h2>Personal Information</h2>
                        <div className="space16" />
                        <p>
                          Kireon Pollardy is a renowned business strategist and thought leader with over 15 years of experience in guiding companies through
                          transformational growth. As and expert in innovation an leadership, Kireon has worked with global brands, helping them navigate the
                          complexities
                        </p>
                        <div className="space32" />
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="details-content">
                              <h4>Date Of Birth:</h4>
                              <div className="space12" />
                              <Link href="/#">September 10,1980</Link>
                              <div className="space32" />
                              <h4>Mobile Number:</h4>
                              <div className="space12" />
                              <Link href="/tel:+(123)4567890">+(123) 456 7890</Link>
                              <div className="space32" />
                              <h4>Date Of Birth:</h4>
                              <div className="space12" />
                              <Link href="/#">PO Box 16122 Collins Street West Victoria 8007 Newyork</Link>
                            </div>
                          </div>
                          <div className="col-lg-7">
                            <div className="heading2">
                              <h3>Personal Information</h3>
                              <div className="space16" />
                              <p>
                                His passion for fostering creativity and driving strategic change has made him a sought-after speaker at top business
                                conferences around the world. At meet Eventify 2024, Kireon will share his the unique insights on future-proofing best
                                businesses, offering practical strategies to help organizations stay agile and on competitive in a rapidly changing meet
                                environment knowledge and real-world.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SpeakerEventHistory />
        {/* ===== TEAM AREA ENDS =======*/}
        {/* ===== CTA AREA STARTS =======*/}
        <SpeakerCTA className="cta1-section-area d-lg-block d-block" />
        {/* ===== CTA AREA ENDS =======*/}
        {/* ===== CTA AREA STARTS =======*/}
        <SpeakerCTA className="cta1-section-area d-lg-none d-block" />
      </div>
    </Layout>
  );
}
