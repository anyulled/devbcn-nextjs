import Link from "next/link";

export default function Section4() {
  return (
    <div className="team2-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 m-auto">
            <div className="team2-header heading4 space-margin60 text-center">
              <h5>our 10+ event speakers</h5>
              <div className="space18" />
              <h2 className="text-anime-style-3">Our Event Speakers</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={900}>
            <div className="speaker-card">
              <div className="speaker-image-wrapper">
                <Link href="/speakers" className="speaker-image-link">
                  <img src="/assets/img/all-images/team/team-img4.png" alt="" className="speaker-image" />
                </Link>
              </div>
              <div className="speaker-content">
                <h4 className="speaker-name mb-0">
                  <Link href="/speakers">Alex Robertson</Link>
                </h4>
                <div className="space16" />
                <p className="speaker-position mb-0">Finance Consultant</p>
                <div className="space24" />
                <div className="speaker-socials">
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-facebook-f" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-linkedin-in" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-instagram" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
            <div className="speaker-card">
              <div className="speaker-image-wrapper">
                <Link href="/speakers" className="speaker-image-link">
                  <img src="/assets/img/all-images/team/team-img5.png" alt="" className="speaker-image" />
                </Link>
              </div>
              <div className="speaker-content">
                <h4 className="speaker-name mb-0">
                  <Link href="/speakers">Alexy Sammo</Link>
                </h4>
                <div className="space16" />
                <p className="speaker-position mb-0">HR Consultant</p>
                <div className="space24" />
                <div className="speaker-socials">
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-facebook-f" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-linkedin-in" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-instagram" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1100}>
            <div className="speaker-card">
              <div className="speaker-image-wrapper">
                <Link href="/speakers" className="speaker-image-link">
                  <img src="/assets/img/all-images/team/team-img6.png" alt="" className="speaker-image" />
                </Link>
              </div>
              <div className="speaker-content">
                <h4 className="speaker-name mb-0">
                  <Link href="/speakers">Andrew Symonds</Link>
                </h4>
                <div className="space16" />
                <p className="speaker-position mb-0">Finance Consultant</p>
                <div className="space24" />
                <div className="speaker-socials">
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-facebook-f" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-linkedin-in" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-instagram" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
            <div className="speaker-card">
              <div className="speaker-image-wrapper">
                <Link href="/speakers" className="speaker-image-link">
                  <img src="/assets/img/all-images/team/team-img7.png" alt="" className="speaker-image" />
                </Link>
              </div>
              <div className="speaker-content">
                <h4 className="speaker-name mb-0">
                  <Link href="/speakers">Ben Stokes</Link>
                </h4>
                <div className="space16" />
                <p className="speaker-position mb-0">Finance Consultant</p>
                <div className="space24" />
                <div className="speaker-socials">
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-facebook-f" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-linkedin-in" />
                  </Link>
                  <Link href="/#" className="social-link">
                    <i className="fa-brands fa-instagram" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
