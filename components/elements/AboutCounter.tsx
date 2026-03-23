"use client";
import CountUp from "react-countup";

export default function AboutCounter() {
  return (
    <div className="about-counter-area">
      <div className="counter-box">
        <h2>
          <CountUp className="odometer" enableScrollSpy={true} end={80} />+
        </h2>
        <div className="space18" />
        <p>Sessions</p>
      </div>
      <div className="counter-box box2">
        <h2>
          <CountUp className="odometer" enableScrollSpy={true} end={70} />+
        </h2>
        <div className="space18" />
        <p>Speakers</p>
      </div>
      <div className="counter-box box3" style={{ border: "none" }}>
        <h2>
          <CountUp className="odometer" enableScrollSpy={true} end={700} />+
        </h2>
        <div className="space18" />
        <p>Attendees</p>
      </div>
    </div>
  );
}
