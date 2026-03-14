type Member = {
  id: number;
  name: string;

  profileUrl: string;
  job: string;

  twitterUrl: string;
  linkedinUrl: string;
};

export const teamMembers: Member[] = [
  {
    id: 1,
    name: "Jonathan Vila",
    job: "Developer Advocate",
    profileUrl: "https://avatars.githubusercontent.com/u/1836434?v=4",
    twitterUrl: "https://twitter.com/vilojona",
    linkedinUrl: "https://www.linkedin.com/in/jonathanvila",
  },
  {
    id: 2,
    name: "Nacho Cougil",
    job: "Principal Software Engineer",
    profileUrl: "/assets/img/all-images/team/nacho-cougil.jpg",
    twitterUrl: "https://twitter.com/icougil",
    linkedinUrl: "https://www.linkedin.com/in/icougil",
  },
];
