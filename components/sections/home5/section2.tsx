import Countdown from "@/components/elements/Countdown";

export default function Section2() {
  return (
    <>
      <div className="others5-section-area">
        <div className="container">
          <Countdown eventDate={new Date().toISOString()} style={2} />
        </div>
      </div>
    </>
  );
}
