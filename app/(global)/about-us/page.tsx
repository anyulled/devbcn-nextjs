import PageHeader from "@/components/layout/PageHeader";
import TeamMemberCard from "@/components/layout/TeamMemberCard";
import CTASection from "@/components/sections/CTASection";
import { getEditionConfig } from "@/config/editions";
import { teamMembers } from "@/team/TeamMembers";

export default function AboutUs() {
  const eventData = getEditionConfig("2026");
  return (
    <div>
      <PageHeader title="About Us" backgroundImageId={15} breadcrumbText="About Us" />
      <div className="team6-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="team-heading heading9 text-center space-margin60">
                <div className="space20" />
                <h2 className="text-anime-style-3">Meet Our Team</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-lg-3 col-md-6 mb-4">
                <TeamMemberCard member={member} />
              </div>
            ))}
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
