import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import TeamMemberCard from "@/components/layout/TeamMemberCard";

describe("TeamMemberCard Component", () => {
  const mockMember = {
    id: 1,
    name: "Jane Smith",
    job: "Lead Developer",
    profileUrl: "/assets/img/team/jane.jpg",
    twitterUrl: "https://twitter.com/janesmith",
    linkedinUrl: "https://linkedin.com/in/janesmith",
  };

  it("matches snapshot with all social links", () => {
    const { container } = render(<TeamMemberCard member={mockMember} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without social links", () => {
    const memberWithoutSocials = { ...mockMember, twitterUrl: "", linkedinUrl: "" };
    const { container } = render(<TeamMemberCard member={memberWithoutSocials} />);
    expect(container).toMatchSnapshot();
  });
});
