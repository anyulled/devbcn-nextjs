import Link from "next/link";

export default function Travel() {
    return (
        <div>
            {/* Header Section */}
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg8.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center">
                                <h1>Travel to Barcelona</h1>
                                <div className="space20" />
                                <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Travel</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="event-sidepage-section-area sp8">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="event-side-images">
                                <div className="space32" />
                                <h3>Venue</h3>
                                <div className="space16" />
                                <p>
                                    <strong>World Trade Center, Barcelona</strong>
                                </p>
                                <p>1ª planta Edif. Este, Moll de Barcelona, s/n, 08039 Barcelona</p>

                                <div className="space40" />
                                <div className="img1">
                                    <img
                                        src="/assets/img/all-images/venue/wtc.webp"
                                        alt="World Trade Center Barcelona - Exterior view"
                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                    />
                                </div>

                                <div className="space40" />
                                <h4>Conference Auditorium</h4>
                                <div className="space16" />
                                <div className="img1">
                                    <img
                                        src="/assets/img/all-images/venue/wtc-auditorio.webp"
                                        alt="World Trade Center Barcelona - Auditorium"
                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                    />
                                </div>

                                <div className="space40" />
                                <h4>Access by Car</h4>
                                <div className="space16" />
                                <p>
                                    🚙 Access by <strong>car:</strong> via C-31 & B-10 (14 minutes from the Airport)
                                </p>
                                <p>
                                    The World Trade Center Barcelona offers paid parking facilities.
                                    For detailed parking information and rates, please visit the{" "}
                                    <Link
                                        href="https://www.wtcbarcelona.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <strong>World Trade Center Barcelona website</strong>
                                    </Link>.
                                </p>

                                <div className="space40" />
                                <h4>Access by Public Transport</h4>
                                <div className="space16" />
                                <ul>
                                    <li>
                                        <strong>🚇 Metro:</strong> Líneas L3: Parada Drassanes, Línea L2: Parada Paral·lel
                                    </li>
                                    <li>
                                        <strong>🚍 Bus:</strong> Línea V11, parada Moll de Barcelona
                                    </li>
                                </ul>

                                <div className="space40" />
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe
                                            width="100%"
                                            height="450"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0089347896845!2d2.1750847!3d41.3755825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8f7c8f7%3A0x7c8f7c8f7c8f7c8f!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                                            title="World Trade Center Barcelona Map"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            style={{ border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}