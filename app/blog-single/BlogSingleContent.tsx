import Link from "next/link";

interface BlogSingleContentProps {
  onPlay: () => void;
}

export default function BlogSingleContent({ onPlay }: BlogSingleContentProps) {
  return (
    <div className="col-lg-8">
      <div className="blog-deatils-content heading2">
        <div className="img1">
          <img src="/assets/img/all-images/blog/blog-img7.png" alt="" />
        </div>
        <div className="space32" />
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
              Gisselle <span> | </span>
            </Link>
          </li>
          <li>
            <Link href="/#">
              <img src="/assets/img/icons/comments1.svg" alt="" />2 Comments
            </Link>
          </li>
        </ul>
        <div className="space18" />
        <h2>Step Into the Future of Business with Eventify</h2>
        <div className="space16" />
        <p>
          At Eventify 2024, you'll join an exclusive gathering of business leaders and innovators shaping the future their industries. This one-day conference
          offers dynamic sessions on leadership, technology, and strategy to help you stay ahead in today's competitive market. Whether you're looking to unlock
          new opportunities or build lasting eventify partnerships, Eventify is where you need to be.
        </p>
        <div className="space48" />
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="img1 image-anime">
              <img src="/assets/img/all-images/blog/blog-img8.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="space30 d-md-none d-block" />
            <div className="img1 image-anime">
              <img src="/assets/img/all-images/blog/blog-img9.png" alt="" />
            </div>
          </div>
        </div>
        <div className="space32" />
        <h3>Eventify: Your Gateway Strategic Growth</h3>
        <div className="space16" />
        <p>
          Fuel an your business growth with actionable insights from world-class experts at Eventify 2024. This premier event brings together forward-thinking
          professionals to explore the latest trends, technologies, and strategies for success. From keynote speeches to interactive workshops, Eventify
          provides you with the tools you need.
        </p>
        <div className="space16" />
        <p>
          "Join us at Eventify 2024, where innovation meets opportunity. This conference is the ultimate destination for business leaders seeking to push the
          boundaries of an what's possible. With sessions on disruptive technologies, leadership trends, and market strategies, you'll walk away with the
          knowledge and connections to lead.
        </p>
        <div className="space48" />
        <div className="video-btn-area">
          <div className="img1">
            <img src="/assets/img/all-images/blog/blog-img10.png" alt="" />
          </div>
          <div className="play">
            <button type="button" onClick={onPlay} className="popup-youtube">
              <i className="fa-solid fa-play" />
            </button>
          </div>
        </div>
        <div className="space32" />
        <h3>Reimagine Business Possibilities Eventify</h3>
        <div className="space16" />
        <p>
          "Eventify 2024 is the ultimate destination for professionals eager to stay ahead in the evolving business landscape. This event brings together to
          innovators, meetup industry leaders, and experts to explore the future of business strategy technology.
        </p>
        <div className="space32" />
        <div className="tags-social-area">
          <div className="tags">
            <h4>Tags:</h4>
            <ul>
              <li>
                <Link href="/#">#Conferences</Link>
              </li>
              <li>
                <Link href="/#" className="m-0">
                  #Meetup
                </Link>
              </li>
            </ul>
          </div>
          <div className="social">
            <h4>Social:</h4>
            <ul>
              <li>
                <Link href="/#">
                  <i className="fa-brands fa-facebook-f" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </li>
              <li>
                <Link href="/#" className="m-0">
                  <i className="fa-brands fa-youtube" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
