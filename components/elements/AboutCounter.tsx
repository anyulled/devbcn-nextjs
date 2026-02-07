"use client";
import CountUp from "react-countup";

export default function AboutCounter() {
    return (
        <div className="about-counter-area">
            <div className="counter-box">
                <h2>
                    <CountUp className="odometer" enableScrollSpy={true} end={250} />+
                </h2>
                <div className="space18" />
                <p>Our Journalist</p>
            </div>
            <div className="counter-box box2">
                <h2>
                    <CountUp className="odometer" enableScrollSpy={true} end={15} />+
                </h2>
                <div className="space18" />
                <p>Our Speaker</p>
            </div>
            <div className="counter-box box3" style={{ border: "none" }}>
                <h2>
                    <CountUp className="odometer" enableScrollSpy={true} end={7} />
                    K+
                </h2>
                <div className="space18" />
                <p>Attendees</p>
            </div>
        </div>
    );
}
