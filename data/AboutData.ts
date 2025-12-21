
type Member = {
  id: number;
  name: string;

  profileUrl: URL;
  job: string;

  twitterUrl: URL;
  linkedinUrl: URL;
};

export const aboutData: Member[] = [
  {
    id: 1,
    name: "Jonathan Vila",
    job: "Developer Advocate",
    profileUrl: new URL("https://avatars.githubusercontent.com/u/1836434?v=4"),
    twitterUrl: new URL("https://twitter.com/vilojona"),
    linkedinUrl: new URL("https://www.linkedin.com/in/jonathanvila"),
  },
  {
    id: 2,
    name: "Nacho Cougil",
    job: "Java Engineer",
    profileUrl: new URL("https://www.devbcn.com/images/nacho.webp"),
    twitterUrl: new URL("https://twitter.com/icougil"),
    linkedinUrl: new URL("https://www.linkedin.com/in/icougil"),
  },
];
