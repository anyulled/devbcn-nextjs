import { aboutData } from "@/data/AboutData";
import Link from "next/link";

export default function AboutUs() {
    return (
        <div>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg15.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 m-auto">
                            <div className="heading1 text-center">
                                <h1>About Us</h1>
                                <div className="space20" />
                                <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>About Us</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="choose-section-area sp2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 m-auto">
                            <div className="heading2 text-center space-margin60">
                                <h5>DevBcn</h5>
                                <div className="space18" />
                                <h2>About Us</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {aboutData.map((member) => (
                            <div className="col-lg-6 col-md-6">
                                <div className="choose-widget-boxarea">
                                    <div className="icons">
                                        <img src={member.profileUrl.toString()} alt={member.name} />
                                    </div>
                                    <div className="space24" />
                                    <div className="content-area">
                                        <Link href={member.twitterUrl.toString()}>{member.name}</Link>
                                        <div className="space16" />
                                        <p>{member.job}</p>
                                        <div className="space24" />
                                        <Link href={member.linkedinUrl.toString()} className="readmore">Read More <i className="fa-solid fa-arrow-right" /></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}