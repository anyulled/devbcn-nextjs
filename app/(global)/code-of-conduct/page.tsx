import Countdown from "@/components/elements/Countdown";
import CTASection from "@/components/sections/CTASection";
import Link from "next/link";
import { getEditionConfig } from "@/config/editions";
import PageSidebar from "@/components/layout/PageSidebar";

export default function CodeOfConduct() {
  const eventData = getEditionConfig("2026");
  return (
    <div>
      <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg15.png)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 m-auto">
              <div className="heading1 text-center">
                <h1>Code of conduct</h1>
                <div className="space20" />
                <Link href="/">
                  Home <i className="fa-solid fa-angle-right" /> <span>Code of conduct</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-details-section sp8">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-deatils-content heading2">
                <div className="space32" />
                <h2>Code of Conduct</h2>
                <div className="space32" />

                <h3>1. Purpose</h3>
                <div className="space16" />
                <p>
                  Harassment includes offensive verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical
                  appearance, body size, race, ethnicity, religion (or lack thereof), ideology, choice of technology, sexual images in public spaces, deliberate
                  intimidation, stalking, following, photographic harassment or recording, sustained disruption of conversations, inappropriate physical contact
                  and unwanted sexual attention.
                </p>
                <div className="space16" />
                <p>
                  We expect participants who are asked to stop any harassing behavior to comply immediately. If a participant engages in harassing behavior,
                  conference organizers may take any action they deem appropriate, such as a warning or expulsion from the conference.
                </p>
                <div className="space16" />
                <p>
                  If you are being harassed, observe that someone else is being harassed or have comments about harassment, please contact the conference
                  organizing team immediately or ask the technical staff for us. Event staff will help participants contact venue organizers, provide escorts,
                  or help those who are being harassed feel safe during the conference.
                </p>
                <div className="space16" />
                <p>
                  We expect participants to follow these rules both during DevBcn and at related social events. This code of conduct outlines our expectations
                  for all those participating in DevBcn both online and offline, as well as the consequences of unacceptable behavior.
                </p>
                <div className="space48" />

                <h3>2. Expected Behavior</h3>
                <div className="space16" />
                <p>The following behavior is expected and requested from all participants of the event:</p>
                <div className="space16" />
                <ul>
                  <li>Participate in an authentic and active manner.</li>
                  <li>Exercise consideration and respect in your speech and actions.</li>
                  <li>Seek collaboration rather than conflict.</li>
                  <li>Respect that people have differences of opinion and that there is rarely one right answer.</li>
                  <li>
                    Ask about gender rather than assuming, and if you get it wrong, apologize and use the gender pronoun they prefer. (Please note that
                    continuing to misgender is harassment).
                  </li>
                  <li>
                    Please note that by attending our events, you are subject to being photographed or videotaped. If you wear a &#34;No photos or video&#34;
                    sticker the official photographer will take that into account for closeup pictures.
                  </li>
                </ul>
                <div className="space48" />

                <h3>3. Unacceptable Behavior</h3>
                <div className="space16" />
                <p>The following behavior is considered harassment and is unacceptable at our events:</p>
                <div className="space16" />
                <ul>
                  <li>Violence, threats of violence or violent language directed at another person.</li>
                  <li>Sexist, racist, homophobic, transphobic, transphobic or discriminatory jokes and language.</li>
                  <li>Posting or displaying sexually explicit or violent material.</li>
                  <li>Posting or threatening to post personally identifiable information about other people (&#34;doxing&#34;).</li>
                  <li>Wearing or displaying signs of discrimination (e.g. logos of racist organisations).</li>
                  <li>Personal insults, particularly those related to gender, sexual orientation, race, religion or disability.</li>
                  <li>
                    Inappropriate photographs or recordings (in any context where individuals have a reasonable expectation of privacy - in restrooms or where
                    participants are resting).
                  </li>
                  <li>
                    Inappropriate physical contact. They must have someone&#39;s verbal consent before touching them. Dressing or acting in a certain way is not
                    consent.
                  </li>
                  <li>Unwanted sexual attention. This includes sexual comments or jokes, inappropriate touching, groping and unwanted sexual advances.</li>
                  <li>Deliberate bullying, stalking or following (online or in person).</li>
                  <li>Sustained disruption of community events, including lectures and presentations.</li>
                  <li>Advocating or encouraging any of the above behaviors.</li>
                </ul>
                <div className="space48" />

                <h3>4. Consequences of Unacceptable Behavior</h3>
                <div className="space16" />
                <p>
                  If a participant behaves inappropriately, the organizers of DevBcn may take whatever action they deem necessary, including warning the
                  offending person or expulsion from the Conference.
                </p>
                <div className="space16" />
                <p>
                  If you are being harassed, see or perceive that someone else is being harassed, or have any other concerns, please contact the organizers
                  immediately. Anyone asked to stop unacceptable behavior is expected to comply immediately.
                </p>
                <div className="space16" />
                <p>Please remember that mistakes happen, you are not a bad person, just re-evaluate your behavior and do better next time.</p>
                <div className="space48" />

                <h3>5. How to Report</h3>
                <div className="space16" />
                <p>
                  If you are the subject of or witness to unacceptable behavior, or have any other concerns, please{" "}
                  <a href="mailto:privacy@devbcn.com" rel="noreferrer" target="_blank">
                    notify the event organizers
                  </a>{" "}
                  as soon as possible. If you do not feel comfortable speaking to an organizer, please feel free to send your concerns or any comments to the
                  event organizers.
                </p>
                <div className="space48" />

                <h3>6. Scope</h3>
                <div className="space16" />
                <p>We expect all participants in DevBcn to abide by this Code of Conduct, both online and in person.</p>
                <div className="space48" />

                <h3>7. Licensing and Attribution</h3>
                <div className="space16" />
                <p>
                  This Code of Conduct is distributed under a Creative Commons Attribution-ShareAlike license. Portions of text derived from the Django Code of
                  Conduct, JornadasDar or Geek Feminism Anti-Harassment Policy.
                </p>
                <div className="space32" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="space30 d-lg-none d-block" />
              <PageSidebar year="2026" />
            </div>
          </div>
        </div>
      </div>
      <CTASection
        ticketUrl={eventData.tickets.url}
        eventStartDate={eventData.event.startDay}
        eventEndDate={eventData.event.endDay}
        eventLocation={eventData.venue}
        showCountdown={eventData.showCountdown}
      />
    </div>
  );
}
