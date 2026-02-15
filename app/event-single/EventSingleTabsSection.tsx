import EventSingleDayOneTab from "./EventSingleDayOneTab";
import EventSingleDayThreeTab from "./EventSingleDayThreeTab";
import EventSingleDayTwoTab from "./EventSingleDayTwoTab";

interface EventSingleTabsSectionProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export default function EventSingleTabsSection({ activeTab, onTabChange }: EventSingleTabsSectionProps) {
  return (
    <div className="event-single-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="event2-header heading2 text-center">
              <h2 className="text-anime-style-3">View More Event</h2>
            </div>
          </div>
          <div className="space32" />
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
            <div className="tabs-button space-margin60">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" onClick={() => onTabChange(1)}>
                  <button
                    className={activeTab == 1 ? "nav-link active" : "nav-link"}
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    <span className="calender">
                      <img src="/assets/img/icons/calender2.svg" alt="" />
                    </span>
                    <span className="pl-8">
                      <span className="day">Day One</span>
                      <span className="date">May 25, 2024</span>
                    </span>
                  </button>
                </li>
                <li className="nav-item" onClick={() => onTabChange(2)}>
                  <button
                    className={activeTab == 2 ? "nav-link active" : "nav-link"}
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    <span className="calender">
                      <img src="/assets/img/icons/calender2.svg" alt="" />
                    </span>
                    <span className="pl-8">
                      <span className="day">Day Two</span>
                      <span className="date">May 25, 2024</span>
                    </span>
                  </button>
                </li>
                <li className="nav-item" onClick={() => onTabChange(3)}>
                  <button
                    className={activeTab == 3 ? "nav-link m-0 active" : "nav-link m-0"}
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    <span className="calender">
                      <img src="/assets/img/icons/calender2.svg" alt="" />{" "}
                    </span>
                    <span className="pl-8">
                      <span className="day">Day Three</span>
                      <span className="date">May 25, 2024</span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <EventSingleDayOneTab isActive={activeTab == 1} />
              <EventSingleDayTwoTab isActive={activeTab == 2} />
              <EventSingleDayThreeTab isActive={activeTab == 3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
