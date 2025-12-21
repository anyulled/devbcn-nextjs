import Countdown from '@/components/elements/Countdown';
import SpeakerCard from '@/components/layout/SpeakerCard';
import { getSpeakers } from "@/hooks/useSpeakers";
import Link from "next/link";

interface SpeakersProps {
    params: Promise<{
        year: number;
    }>;
}

export default async function Speakers({ params }: SpeakersProps) {
    const { year } = await params;
    const speakers = await getSpeakers(year);

    return (
        <div>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg6.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 m-auto">
                            <div className="heading1 text-center">
                                <h1>Our Speakers</h1>
                                <div className="space20" />
                                <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Our Speakers</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== HERO AREA ENDS =======*/}
            {/*===== TEAM AREA STARTS =======*/}
            <div className="team-sperkers-section-area sp1">
                <div className="container">
                    <div className="row">
                        {speakers.map((speaker) => <div key={speaker.id} className="col-lg-3 col-md-6">
                            <SpeakerCard name={speaker.fullName} image={speaker.profilePicture} position={speaker.tagLine} links={speaker.links} />
                        </div>)}
                    </div>
                </div>
            </div>
            {/*===== TEAM AREA ENDS =======*/}
            {/*===== CTA AREA STARTS =======*/}

            <div className="cta1-section-area d-lg-block d-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="cta1-main-boxarea">
                                <div className="timer-btn-area">
                                    <Countdown />
                                    <div className="btn-area1">
                                        <Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
                                    </div>
                                </div>
                                <ul>
                                    <li>
                                        <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />16-17 June 2026</Link>
                                    </li>
                                    <li className="m-0">
                                        <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />World Trade Center Barcelona</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}