import Link from "next/link";
import { Train, Bus, Car, MapPin } from "lucide-react";

interface WTCVenueProps {
  venueName: string;
}

export default function WTCVenue({ venueName }: Readonly<WTCVenueProps>) {
  return (
    <div className="wtc-venue">
      {/* 1. Venue Header Section */}
      <div className="wtc-venue__header">
        <div className="wtc-venue__info">
          <h3>{venueName}</h3>
          <p>
            Located on the seafront, the <strong>World Trade Center Barcelona</strong> is a cutting-edge business park featuring panoramic views of the
            Mediterranean.
          </p>
          <p>
            <MapPin className="inline-block mr-2 text-primary" size={18} />
            1ª planta Edif. Este, Moll de Barcelona, s/n, 08039 Barcelona
          </p>
        </div>
        <div className="wtc-venue__image">
          <img src="/assets/img/all-images/venue/wtc.webp" alt="World Trade Center Barcelona - Exterior view" />
        </div>
      </div>

      <div className="space50" />

      {/* 2. Transport Grid Section */}
      <h4>Getting There</h4>
      <div className="wtc-venue__transport-grid">
        {/* Metro Card */}
        <div className="wtc-venue__card">
          <div className="wtc-venue__card-icon">
            <Train />
          </div>
          <h5>By Metro</h5>
          <p>L3 Drassanes (10 min walk)</p>
          <p>L2 Paral·lel (15 min walk)</p>
        </div>

        {/* Bus Card */}
        <div className="wtc-venue__card">
          <div className="wtc-venue__card-icon">
            <Bus />
          </div>
          <h5>By Bus</h5>
          <p>Lines V11, D20, H14, V13</p>
          <p>Stop: Moll de Barcelona</p>
        </div>

        {/* Car Card */}
        <div className="wtc-venue__card">
          <div className="wtc-venue__card-icon">
            <Car />
          </div>
          <h5>By Car & Parking</h5>
          <p>Via B-10 (Ronda Litoral)</p>
          <p>
            <Link href="https://www.wtcbarcelona.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              On-site Parking available
            </Link>
          </p>
        </div>
      </div>

      {/* 3. Auditorium Section */}
      <div className="wtc-venue__auditorium">
        <h4>The Conference Auditorium</h4>
        <div className="img-container">
          <img src="/assets/img/all-images/venue/wtc-auditorio.webp" alt="World Trade Center Barcelona - Auditorium" />
        </div>
      </div>

      {/* 4. Map Section */}
      <div className="wtc-venue__map-container">
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

      {/* 5. Accommodation Section */}
      <div className="wtc-venue__accommodation">
        <h4>Coming from abroad?</h4>
        <p>
          We recommend looking for accommodation in the <strong>Poble Sec</strong> or <strong>Paral·lel</strong> neighborhoods, which offer a great mix of local
          culture and are within walking distance of the venue.
        </p>
      </div>
    </div>
  );
}
