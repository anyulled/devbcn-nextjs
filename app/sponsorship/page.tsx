import { format } from "date-fns";

export default function Sponsorship() {
    const data = {
        edition: "2026",
        startDay: "2026-12-21",
        endDay: "2026-12-21",
        venue: "Barcelona",
        brochure: "https://devbcn.com/brochure.pdf",
    };
    return (
        <div>
            <h1>Sponsorship</h1>
            <h4>Mark Your Calendars!</h4>
            <p>
                DevBcn <strong>{data?.edition}</strong> is set for{" "}
                <strong>
                    {format(new Date(data.startDay), "MMMM do")} —
                    {" ".concat(format(data.endDay, "do"))}
                </strong>{" "}
                at the iconic {data.venue}. This year, we&#39;re diving deep
                into the realms of Java, JVM, Cloud, DevOps, Frontend
                technologies, Leadership strategies, and groundbreaking
                advancements in Big Data and AI.
            </p>
            <h4>A New Era of Tech Innovation</h4>
            <p>
                Dive into tracks covering Java, JVM, Cloud, DevOps, Frontend
                technologies, Leadership, Big Data, AI, and more. DevBcn{" "}
                {data?.edition} is the perfect stage to connect with tech
                professionals, thought leaders, and innovators.
            </p>
            <h4>Tailored Sponsorship Opportunities</h4>
            <p>
                While we&#39;re keeping the details of our sponsorship packages
                exclusive, we promise they&#39;re more engaging and impactful
                than ever. Curious? Access our{" "}
                <strong>
                    <a href={data.brochure} target="_blank" rel="noreferrer">
                        detailed brochure
                    </a>{" "}
                </strong>{" "}
                at and discover the myriad of ways you can shine at DevBcn{" "}
                {data?.edition}.
            </p>
            <div>
                <a href={data.brochure}
                    target="_blank"
                    rel="noreferrer"
                >Get the Brochure</a>
            </div>
            <h4>Why Partner with DevBcn?</h4>
            <p>
                <ul>
                    <li>
                        <strong>Expand Your Reach:</strong> Engage with a diverse,
                        tech-savvy audience. Our latest edition held more than 800
                        attendees.
                    </li>
                    <li>
                        <strong>Elevate Your Brand:</strong> Showcase your products
                        and innovations in a dynamic environment.
                    </li>
                    <li>
                        <strong>Network with the Best:</strong> Connect with
                        industry leaders and potential collaborators. Nearly 30
                        companies have pledged their trust in DevBcn.
                    </li>
                    <li>
                        <strong>Showcase Thought Leadership:</strong> Share your
                        expertise and insights with a global audience.
                    </li>
                </ul>
            </p>
            <h4>Join us on this exciting journey</h4>
            <p>
                To discuss how we can align our sponsorship opportunities with
                your brand&#39;s vision, contact us at{" "}
                <a href="mailto:sponsors@devbcn.com"> sponsors@devbcn.com</a>
            </p>
            <p>
                Let’s make DevBcn {data?.edition} an unforgettable experience
                together! Stay updated and spread the excitement using{" "}
                <a
                    href={`https://twitter.com/hashtag/devbcn${data?.edition.substring(2)}?src=hashtag_click`}
                    target="_blank"
                    rel="noreferrer"
                >
                    #devbcn{data?.edition.substring(2)}.
                </a>
            </p>
            <p>
                We eagerly await the opportunity to collaborate with you once
                more for an extraordinary event!
            </p>
            <h4>Take a look at our latest edition summary</h4>
            <div>
                <iframe
                    width="1024"
                    height="768"
                    src="https://www.youtube.com/embed/AHWSu1WE288"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
            <h4>Explore DevBcn Talks Online!</h4>
            <ul>
                <li>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://youtube.com/playlist?list=PLzJFNZtyAbyyfUadLCuSc-8CdHct8NeSa&si=7lgKQAtEncL-332O"
                    >
                        🎥 DevBcn 2025 - recorded sessions
                    </a>
                </li>
                <li>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.youtube.com/playlist?list=PLzJFNZtyAbyxg4LfdyFbcANJXDbilXjBB"
                    >
                        🎥 DevBcn 2024 - recorded sessions
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.youtube.com/playlist?list=PLzJFNZtyAbyzmAAKzx1COeIBEGFgPA_og"
                        rel="noreferrer"
                        target="_blank"
                    >
                        🎥 DevBcn 2023 - recorded sessions
                    </a>
                </li>
            </ul>
        </div>
    )
}