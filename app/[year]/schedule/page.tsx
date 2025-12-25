import { getAvailableEditions } from "@/config/editions";
import Link from "next/link";

interface ScheduleProps {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export default async function Schedule({ params }: ScheduleProps) {
  const { year } = await params;
  return (
    <div>
      <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg6.png)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 m-auto">
              <div className="heading1 text-center">
                <h1>Schedule</h1>
                <div className="space20" />
                <Link href="/">
                  Home <i className="fa-solid fa-angle-right" /> <span>Schedule</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-sperkers-section-area sp1">
        <div className="container">
          <div className="row">Coming Soon</div>
        </div>
      </div>
    </div>
  );
}
