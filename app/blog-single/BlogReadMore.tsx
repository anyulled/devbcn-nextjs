import Link from "next/link";

export default function BlogReadMore() {
  return (
    <div className="bloginner-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 m-auto">
            <div className="heading2 text-center space-margin60">
              <h2>Read More Blogs</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800}>
            <div className="blog4-boxarea">
              <div className="img1">
                <img src="/assets/img/all-images/memory/memory-img7.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/calender1.svg" alt="" />
                      26 Jan 2025 <span> | </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/user1.svg" alt="" />
                      Beverly
                    </Link>
                  </li>
                </ul>
                <div className="space20" />
                <Link href="/blog-single">Eventify 2024: Unlock the Future of Business</Link>
                <div className="space24" />
                <Link href="/blog-single" className="readmore">
                  read more <i className="fa-solid fa-arrow-right" />
                </Link>
                <div className="arrow">
                  <Link href="/blog-single">
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
            <div className="blog4-boxarea">
              <div className="img1">
                <img src="/assets/img/all-images/memory/memory-img8.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/calender1.svg" alt="" />
                      26 Jan 2025 <span> | </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/user1.svg" alt="" />
                      Gisselle
                    </Link>
                  </li>
                </ul>
                <div className="space20" />
                <Link href="/blog-single">Where Vision Meetup Connect: Eventify 2024</Link>
                <div className="space24" />
                <Link href="/blog-single" className="readmore">
                  read more <i className="fa-solid fa-arrow-right" />
                </Link>
                <div className="arrow">
                  <Link href="/blog-single">
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
            <div className="blog4-boxarea">
              <div className="img1">
                <img src="/assets/img/all-images/memory/memory-img9.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/calender1.svg" alt="" />
                      26 Jan 2025 <span> | </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/user1.svg" alt="" />
                      Mertie
                    </Link>
                  </li>
                </ul>
                <div className="space20" />
                <Link href="/blog-single">Fuel Your Business Growth at Eventify</Link>
                <div className="space24" />
                <Link href="/blog-single" className="readmore">
                  read more <i className="fa-solid fa-arrow-right" />
                </Link>
                <div className="arrow">
                  <Link href="/blog-single">
                    <i className="fa-solid fa-arrow-right" />
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
