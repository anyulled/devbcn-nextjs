import Link from "next/link";

export default function BlogSingleSidebar() {
  return (
    <div className="col-lg-4">
      <div className="space30 d-lg-none d-block" />
      <div className="blog-auhtor-details">
        <div className="search-area">
          <h3>Search</h3>
          <div className="space24" />
          <form>
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </form>
        </div>
        <div className="space32" />
        <div className="blog-categories">
          <h3>Blog Category</h3>
          <div className="space12" />
          <ul>
            <li>
              <Link href="/#">
                Business Innovation{" "}
                <span>
                  <i className="fa-solid fa-angle-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/#">
                Leadership &amp; Strategy{" "}
                <span>
                  <i className="fa-solid fa-angle-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/#">
                Networking &amp; Collaboration{" "}
                <span>
                  <i className="fa-solid fa-angle-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/#">
                Entrepreneurship Startups{" "}
                <span>
                  <i className="fa-solid fa-angle-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/#">
                Marketing &amp; Branding{" "}
                <span>
                  <i className="fa-solid fa-angle-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/#">
                Event Highlights &amp; Recaps{" "}
                <span>
                  <i className="fa-solid fa-angle-right" />
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="space32" />
        <div className="tags-area">
          <h3>Popular Hastag</h3>
          <div className="space12" />
          <ul>
            <li>
              <Link href="/#">#Conferences</Link>
            </li>
            <li>
              <Link href="/#">#Meetup</Link>
            </li>
            <li>
              <Link href="/#">#Event</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/#">#Eventify2024</Link>
            </li>
            <li>
              <Link href="/#">#DigitalTransformation</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/#">#BusinessLeadership</Link>
            </li>
            <li>
              <Link href="/#">#IndustryTrends</Link>
            </li>
          </ul>
        </div>
        <div className="space32" />
        <div className="author-images-area">
          <h3>Popular Author</h3>
          <div className="space12" />
          <ul>
            <li>
              <img src="/assets/img/all-images/blog/blog-img11.png" alt="" />
            </li>
            <li>
              <img src="/assets/img/all-images/blog/blog-img12.png" alt="" />
            </li>
            <li>
              <img src="/assets/img/all-images/blog/blog-img13.png" alt="" />
            </li>
            <li>
              <img src="/assets/img/all-images/blog/blog-img14.png" alt="" />
            </li>
          </ul>
          <ul>
            <li>
              <img src="/assets/img/all-images/blog/blog-img15.png" alt="" />
            </li>
            <li>
              <img src="/assets/img/all-images/blog/blog-img16.png" alt="" />
            </li>
            <li>
              <img src="/assets/img/all-images/blog/blog-img17.png" alt="" />
            </li>
            <li>
              <img src="/assets/img/all-images/blog/blog-img18.png" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
