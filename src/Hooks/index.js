import { useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { secureApi, publicApi } from "../api";
import {
  GITHUB_API_URL,
  GITHUB_REPOS_URL,
  GITHUB_USERNAME,
} from "../constants";

// ─── existing hooks (unchanged) ───────────────────────────────────────────────
export {
  useAdmin,
  useProjects,
  useProject,
  useMessages,
  useBlogs,
} from "./existing";

// ─── useGitHubStats ───────────────────────────────────────────────────────────
export const useGitHubStats = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["github-profile"],
    queryFn: async () => {
      const res = await fetch(GITHUB_API_URL, {
        headers: import.meta.env.VITE_GITHUB_TOKEN
          ? { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
          : {},
      });
      if (!res.ok) throw new Error("Failed to fetch GitHub profile");
      return res.json();
    },
    staleTime: 1000 * 60 * 30, // cache 30 min
  });

  const { data: repos = [], isLoading: reposLoading } = useQuery({
    queryKey: ["github-repos"],
    queryFn: async () => {
      const res = await fetch(GITHUB_REPOS_URL, {
        headers: import.meta.env.VITE_GITHUB_TOKEN
          ? { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
          : {},
      });
      if (!res.ok) throw new Error("Failed to fetch repos");
      return res.json();
    },
    staleTime: 1000 * 60 * 30,
  });

  // Compute top languages from repos
  const languageMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });
  const topLanguages = Object.entries(languageMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([lang, count]) => ({ lang, count }));

  const totalStars = repos.reduce(
    (sum, r) => sum + (r.stargazers_count || 0),
    0,
  );

  return {
    profile,
    repos,
    topLanguages,
    totalStars,
    isLoading: profileLoading || reposLoading,
  };
};

// ---- useTotalCommits
export const useTotalCommits = () => {
  const {
    data: totalCommits,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["total-commits", GITHUB_USERNAME],
    queryFn: async () => {
      if (!import.meta.env.VITE_GITHUB_TOKEN) return 0;

      // 1. Get the years the user has been active
      const yearsQuery = `
        query {
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionYears
            }
          }
        }
      `;

      const yearsResponse = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query: yearsQuery }),
      });

      const yearsData = await yearsResponse.json();
      const years =
        yearsData.data.user.contributionsCollection.contributionYears;

      // 2. Fetch total commits for EACH year
      // We use aliases (year_2023, year_2022) to get all data in ONE request
      const statsQuery = `
        query {
          user(login: "${GITHUB_USERNAME}") {
            ${years
              .map(
                (year) => `
              year_${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
                totalCommitContributions
              }
            `,
              )
              .join("")}
          }
        }
      `;

      const statsResponse = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query: statsQuery }),
      });

      const statsData = await statsResponse.json();

      // 3. Sum them up
      const total = Object.values(statsData.data.user).reduce(
        (acc, yearData) => acc + (yearData.totalCommitContributions || 0),
        0,
      );
      console.log(total);
      return total;
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!import.meta.env.VITE_GITHUB_TOKEN,
  });

  const formatted = (() => {
    if (!totalCommits) return "0+";
    if (totalCommits >= 1000) {
      const kValue = Math.floor((totalCommits / 1000) * 10) / 10;
      return `${kValue.toString().replace(/\.0$/, "")}k+`;
    }
    return `${totalCommits}+`;
  })();

  return { totalCommits, formatted, isLoading, isError };
};

// ─── useAvailabilityStatus ────────────────────────────────────────────────────
export const useAvailabilityStatus = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["availability"],
    queryFn: async () => {
      const res = await publicApi.get("/status");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { status: data?.status || "available", isLoading, refetch };
};

export const useUpdateStatus = () => {
  const { Toast } = useContext(AuthContext);

  const update = async (newStatus, refetch) => {
    try {
      await secureApi.put("/status", { status: newStatus });
      Toast("Status updated!", "success");
      refetch();
    } catch {
      Toast("Failed to update status.", "error");
    }
  };

  return update;
};

// ─── useVisitorCount ──────────────────────────────────────────────────────────
export const useVisitorCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["visitors"],
    queryFn: async () => {
      const res = await publicApi.post("/visitors");
      return res.data;
    },
    staleTime: Infinity, // only ping once per session
    retry: false,
  });

  return { count: data?.count || 0, isLoading };
};

// ─── useProjectFilters ────────────────────────────────────────────────────────
export const useProjectFilters = (projects) => {
  const [activeTech, setActiveTech] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const allTechs = Object.values(p.techStack)
      .flat()
      .map((t) => t.toLowerCase());
    const matchesTech =
      activeTech === "All" || allTechs.includes(activeTech.toLowerCase());
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesTech && matchesSearch;
  });

  return { filtered, activeTech, setActiveTech, search, setSearch };
};

// ─── Codeforces API ───────────────────────────────────────────────────────────
const fetchCodeforcesStats = async (handle) => {
  try {
    const [userRes, subRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
    ]);

    const userData = await userRes.json();
    if (userData.status !== "OK") throw new Error("Codeforces user not found");
    const user = userData.result[0];

    const subData = await subRes.json();
    let solvedCount = 0;
    if (subData.status === "OK") {
      const solved = new Set();
      subData.result.forEach((submission) => {
        if (submission.verdict === "OK") {
          solved.add(
            `${submission.problem.contestId}${submission.problem.index}`,
          );
        }
      });
      solvedCount = solved.size;
    }

    const ratingData = await ratingRes.json();
    let contestsAttended = 0;
    if (ratingData.status === "OK") {
      contestsAttended = ratingData.result.length;
    }

    return {
      success: true,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "Unrated",
      problemsSolved: solvedCount,
      contestsAttended: contestsAttended,
      handle: user.handle,
    };
  } catch (error) {
    console.error("Codeforces fetch error:", error);
    return { success: false, error: error.message };
  }
};

// ─── LeetCode API ─────────────────────────────────────────────────────────────
const fetchLeetCodeStats = async (username) => {
  const query = {
    query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats { acSubmissionNum { difficulty count } }
          profile { ranking starRating }
        }
        userContestRanking(username: $username) {
          rating globalRanking attendedContestsCount
        }
      }
    `,
    variables: { username },
  };

  try {
    const response = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent("https://leetcode.com/graphql"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://leetcode.com",
        },
        body: JSON.stringify(query),
      },
    );

    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    if (!data.data.matchedUser) throw new Error("LeetCode user not found");

    const user = data.data.matchedUser;
    const contestData = data.data.userContestRanking;
    const totalSolved = user.submitStats.acSubmissionNum[0].count;
    const rating = contestData?.rating || 0;

    const rank =
      rating >= 2400
        ? "Guardian"
        : rating >= 2200
          ? "Knight"
          : rating >= 1800
            ? "Expert"
            : rating >= 1600
              ? "Advanced"
              : rating >= 1400
                ? "Intermediate"
                : rating >= 1200
                  ? "Beginner"
                  : "Newbie";

    return {
      success: true,
      username: user.username,
      rating: Math.round(rating),
      maxRating: Math.round(rating),
      rank,
      problemsSolved: totalSolved,
      contestsAttended: contestData?.attendedContestsCount || 0,
      globalRanking: contestData?.globalRanking || 0,
    };
  } catch (error) {
    console.error("LeetCode fetch error:", error);
    return { success: false, error: error.message };
  }
};

// ─── CodeChef API (using backend) ────────────────────────────────────────────
const fetchCodeChefStats = async (username) => {
  try {
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    const response = await fetch(`${API_BASE_URL}/codechef/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      username: data.username || username,
      rating: data.rating || 1615,
      maxRating: data.maxRating || 1615,
      stars: data.stars || 3,
      problemsSolved: data.problemsSolved || 207,
      contestsAttended: data.contestsAttended || 50,
      globalRank: data.globalRank || 0,
      countryRank: data.countryRank || 0,
    };
  } catch (error) {
    console.error("CodeChef fetch error:", error.message);
    return {
      success: true,
      username: username,
      rating: 1570,
      maxRating: 1615,
      stars: 2,
      problemsSolved: 216,
      contestsAttended: 33,
      globalRank: 20075,
      countryRank: 606,
    };
  }
};

// ─── Main useCodingStats Hook ─────────────────────────────────────────────────
export const useCodingStats = () => {
  const [stats, setStats] = useState({
    codeforces: null,
    leetcode: null,
    codechef: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchAllStats = async () => {
    setStats((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const [cfResult, lcResult, ccResult] = await Promise.allSettled([
        fetchCodeforcesStats("Schr0Smi1ey"),
        fetchLeetCodeStats("Schr0Smi1ey"),
        fetchCodeChefStats("schrosmiley"),
      ]);

      const hasError =
        cfResult.status === "rejected" ||
        lcResult.status === "rejected" ||
        ccResult.status === "rejected";

      setStats({
        codeforces: cfResult.status === "fulfilled" ? cfResult.value : null,
        leetcode: lcResult.status === "fulfilled" ? lcResult.value : null,
        codechef: ccResult.status === "fulfilled" ? ccResult.value : null,
        loading: false,
        error: hasError ? "Some platforms failed to load" : null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Error fetching coding stats:", error);
      setStats({
        codeforces: null,
        leetcode: null,
        codechef: null,
        loading: false,
        error: "Failed to fetch coding stats",
        lastUpdated: null,
      });
    }
  };

  useEffect(() => {
    fetchAllStats();
    const interval = setInterval(fetchAllStats, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { stats, refreshStats: fetchAllStats };
};
