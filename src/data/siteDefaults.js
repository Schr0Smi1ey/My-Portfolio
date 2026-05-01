import { GITHUB_USERNAME, OWNER, SOCIAL_LINKS } from "../constants";

export const ownerDefaults = {
  ...OWNER,
  location: "Dhaka, Bangladesh",
  socialLinks: SOCIAL_LINKS,
};

export const aboutDefaults = {
  paragraph:
    "I am a junior full-stack developer focused on practical React, Node.js, MongoDB, Firebase, and API-driven products. I like building clean interfaces, useful dashboards, and reliable backend flows.",
  contactEmail: OWNER.email,
  stats: [
    { label: "Projects", value: "15+", tone: "primary" },
    { label: "Problems Solved", value: "1135+", tone: "success" },
    { label: "Experience", value: "1+ yr", tone: "warning" },
  ],
  interests: [
    "Full-stack apps",
    "Competitive programming",
    "Backend APIs",
    "Dashboard systems",
  ],
};

export const githubFallbackDefaults = {
  success: true,
  manual: true,
  profile: {
    login: GITHUB_USERNAME,
    public_repos: 47,
    followers: 7,
    following: 6,
  },
  topLanguages: [
    { lang: "JavaScript", count: 18 },
    { lang: "HTML", count: 10 },
    { lang: "CSS", count: 8 },
    { lang: "TypeScript", count: 3 },
    { lang: "Python", count: 2 },
  ],
  totalStars: 2,
  totalCommits: 1000,
  lastUpdated: "2026-05-01T00:00:00.000Z",
};

export const codingFallbackDefaults = {
  success: true,
  manual: true,
  platforms: {
    codeforces: {
      status: "success",
      data: {
        handle: "Schr0Smi1ey",
        rating: 0,
        maxRating: 0,
        rank: "Unrated",
        problemsSolved: 0,
        contestsAttended: 0,
      },
    },
    leetcode: {
      status: "success",
      data: {
        username: "Schr0Smi1ey",
        rating: 0,
        maxRating: 0,
        rank: "Newbie",
        problemsSolved: 0,
        contestsAttended: 0,
        globalRanking: 0,
      },
    },
    codechef: {
      status: "success",
      data: {
        username: "schrosmiley",
        rating: 0,
        maxRating: 0,
        rank: "Unrated",
        problemsSolved: 0,
        contestsAttended: 0,
      },
    },
  },
  lastUpdated: "2026-05-01T00:00:00.000Z",
};

export const siteContentDefaults = {
  owner: ownerDefaults,
  about: aboutDefaults,
  githubFallbacks: githubFallbackDefaults,
  codingFallbacks: codingFallbackDefaults,
};
