import Link from "next/link";

interface Section3TabPaneSingleProps {
  isActive: boolean;
  id: string;
  labelledBy: string;
  image: string;
  title: string;
  description: string;
}

export default function Section3TabPaneSingle({ isActive, id, labelledBy, image, title, description }: Section3TabPaneSingleProps) {
  return (
    <div className={isActive ? "tab-pane fade show active" : "tab-pane fade"} id={id} role="tabpanel" aria-labelledby={labelledBy} tabIndex={0}>
      <div className="tabs-widget-boxarea">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="img1">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="content-area">
              <ul>
                <li>
                  <Link href="/#">
                    <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
                  </Link>
                </li>
                <li>
                  <Link href="/#">
                    <img src="/assets/img/icons/location1.svg" alt="" /> 26/C Asana, New York{" "}
                  </Link>
                </li>
              </ul>
              <div className="space20" />
              <Link href="/event-single" className="head">
                {title}
              </Link>
              <div className="space16" />
              <p>{description}</p>
              <div className="space32" />
              <div className="btn-area1">
                <Link href="/pricing-plan" className="vl-btn1">
                  purchase ticket now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
