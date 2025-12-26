import Link from "next/link";

export default function LaFargaVenue() {
  return (
    <>
      <div className="img1">
        <img
          src="/assets/img/all-images/venue/la-farga.webp"
          alt="La Farga"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </div>
      <div className="space16" />
      <p>
        <Link href="https://www.lafarga.com/corporatiu/lafarga-hospitalet/" rel="noreferrer" target="_blank">
          <strong>La Farga Centre d&#39;Activitats</strong>
        </Link>
      </p>
      <p>carrer Barcelona, 2. 08901 L&#39;Hospitalet de Llobregat</p>
      <p>Telf. 932615200</p>

      <div className="space40" />
      <h4>Venue Entrance</h4>
      <div className="space16" />
      <p>
        <Link rel="noreferrer" href="https://maps.app.goo.gl/2zao7ynr4wE7UYDn8" target="_blank">
          <strong>A) Talks:</strong> Carrer Barcelona, 12
        </Link>
      </p>
      <p>
        <Link rel="noreferrer" href="https://maps.app.goo.gl/YwU14LoRvWmtXk138" target="_blank">
          <strong>B) Workshops:</strong> Carrer Girona, 15
        </Link>
      </p>

      <div className="space40" />
      <h4>Access by Public Transportation</h4>
      <div className="space16" />
      <p>
        🚝 <strong>Cercanías R5:</strong> Estación Hospitalet de Llobregat
      </p>
      <p>
        🚇 <strong>Metro:</strong> Parada Rambla Just Oliveras
      </p>
      <p>
        🚍 <strong>Bus:</strong> Líneas L12 – LH2
      </p>
      <p>
        🚝 <img src="/assets/img/all-images/venue/fgc.png" alt="FGC" width="20" style={{ display: "inline", verticalAlign: "middle" }} /> <strong>FGC:</strong>{" "}
        Estación Sant Josep
      </p>

      <div className="space40" />
      <h4>Access by Car</h4>
      <div className="space16" />
      <p>
        🚙 Access by <strong>car:</strong> via C-31 (20 minutes from the Airport)
      </p>

      <div className="space40" />
      <h4>Paid Parking Options</h4>
      <div className="space16" />
      <p>
        <Link href="https://centrolafarga.com/" rel="noreferrer" target="_blank">
          <strong>La Farga Centre Comercial</strong>
        </Link>
      </p>

      <div className="space40" />
      <div className="img1">
        <img
          src="/assets/img/all-images/venue/venue-entrance.webp"
          alt="Venue entrance map"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </div>
    </>
  );
}
