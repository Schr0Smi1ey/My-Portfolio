import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { secureApi, publicApi } from "../api";
import { GITHUB_API_URL, GITHUB_REPOS_URL, GITHUB_USERNAME } from "../constants";

export {
  useAdmin,
  useProjects,
  useProject,
  useMessages,
  useBlogs,
} from "./existing";

const summarizeGitHubRepos = (repos) => {
  const languageMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });

  return {
    totalStars: repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0,
    ),
    topLanguages: Object.entries(languageMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([lang, count]) => ({ lang, count })),
  };
};

const fetchPublicGitHubFallback = async () => {
  const [profileRes, reposRes] = await Promise.all([
    fetch(GITHUB_API_URL),
    fetch(GITHUB_REPOS_URL),
  ]);

  if (!profileRes.ok || !reposRes.ok) {
    throw new Error("GitHub stats unavailable");
  }

  const profile = await profileRes.json();
  const repos = await reposRes.json();
  const summary = summarizeGitHubRepos(Array.isArray(repos) ? repos : []);

  return {
    success: true,
    error: "Commit totals require the backend stats service.",
    profile,
    topLanguages: summary.topLanguages,
    totalStars: summary.totalStars,
    totalCommits: null,
  };
};

const githubStatsQuery = {
  queryKey: ["github-stats", GITHUB_USERNAME],
  queryFn: async () => {
    try {
      const res = await publicApi.get("/stats/github", {
        params: { username: GITHUB_USERNAME },
      });
      return res.data;
    } catch {
      return fetchPublicGitHubFallback();
    }
  },
  staleTime: 1000 * 60 * 30,
};

export const useGitHubStats = () => {
  const {
    data,
    isLoading,
    refetch,
    error: queryError,
  } = useQuery(githubStatsQuery);

  return {
    profile: data?.profile ?? null,
    topLanguages: data?.topLanguages ?? [],
    totalStars: data?.totalStars ?? null,
    totalCommits: data?.totalCommits ?? null,
    error:
      queryError?.message ||
      (data?.success === false ? data.error || "GitHub stats unavailable" : null),
    isLoading,
    refetch,
  };
};

export const useTotalCommits = () => {
  const { data, isLoading, error: queryError } = useQuery(githubStatsQuery);
  const totalCommits =
    data?.success === true ? (data.totalCommits ?? null) : null;

  const formatted = (() => {
    if (totalCommits == null) return null;
    if (totalCommits >= 1000) {
      const kValue = Math.floor((totalCommits / 1000) * 10) / 10;
      return `${kValue.toString().replace(/\.0$/, "")}k+`;
    }
    return `${totalCommits}+`;
  })();

  return {
    totalCommits,
    formatted,
    isLoading,
    isError: Boolean(queryError) || data?.success === false,
  };
};

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

export const useVisitorCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["visitors"],
    queryFn: async () => {
      const res = await publicApi.post("/visitors");
      return res.data;
    },
    staleTime: Infinity,
    retry: false,
  });

  return { count: data?.count || 0, isLoading };
};

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

const normalizePlatform = (platform) => {
  if (platform?.status === "success") {
    return { status: "success", ...platform.data };
  }

  return {
    status: "unavailable",
    error: platform?.error || "Unavailable",
  };
};

const fetchCodeforcesFallback = async (handle) => {
  const [userRes, subRes, ratingRes] = await Promise.all([
    fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
    fetch(`https://codeforces.com/api/user.status?handle=${handle}`),
    fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
  ]);

  const userData = await userRes.json();
  if (userData.status !== "OK" || !userData.result?.[0]) {
    throw new Error("Codeforces user not found");
  }

  const solved = new Set();
  const subData = await subRes.json();
  if (subData.status === "OK") {
    subData.result.forEach((submission) => {
      if (submission.verdict === "OK") {
        solved.add(`${submission.problem.contestId}${submission.problem.index}`);
      }
    });
  }

  const ratingData = await ratingRes.json();
  const user = userData.result[0];

  return {
    status: "success",
    data: {
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "Unrated",
      problemsSolved: solved.size,
      contestsAttended:
        ratingData.status === "OK" ? ratingData.result.length : 0,
    },
  };
};

const fetchLeetCodeFallback = async (username) => {
  const query = {
    query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats { acSubmissionNum { difficulty count } }
        }
        userContestRanking(username: $username) {
          rating globalRanking attendedContestsCount
        }
      }
    `,
    variables: { username },
  };

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

  if (!response.ok) throw new Error("LeetCode stats unavailable");
  const data = await response.json();
  const user = data.data?.matchedUser;
  if (!user) throw new Error("LeetCode user not found");

  const contestData = data.data?.userContestRanking;
  const rating = Math.round(contestData?.rating || 0);

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
    status: "success",
    data: {
      username: user.username,
      rating,
      maxRating: rating,
      rank,
      problemsSolved: user.submitStats?.acSubmissionNum?.[0]?.count || 0,
      contestsAttended: contestData?.attendedContestsCount || 0,
      globalRanking: contestData?.globalRanking || 0,
    },
  };
};

const unavailablePlatform = (error) => ({
  status: "unavailable",
  error: error.message || "Unavailable",
});

const fetchCodeChefLegacyFallback = async (username) => {
  const res = await publicApi.get(`/codechef/${username}`);
  const data = res.data;

  if (!data?.success) {
    throw new Error(data?.error || "CodeChef stats unavailable");
  }

  return { status: "success", data };
};

const withCodeChefLegacyFallback = async (payload) => {
  if (payload?.platforms?.codechef?.status === "success") {
    return payload;
  }

  try {
    const codechef = await fetchCodeChefLegacyFallback("schrosmiley");
    const platforms = {
      ...(payload?.platforms || {}),
      codechef,
    };
    const successCount = Object.values(platforms).filter(
      (platform) => platform.status === "success",
    ).length;

    return {
      ...payload,
      success: successCount === 3,
      partial: successCount > 0 && successCount < 3,
      platforms,
      lastUpdated: payload?.lastUpdated || new Date().toISOString(),
    };
  } catch (error) {
    return payload;
  }
};

const fetchCodingFallback = async () => {
  const [codeforcesResult, leetcodeResult, codechefResult] =
    await Promise.allSettled([
    fetchCodeforcesFallback("Schr0Smi1ey"),
    fetchLeetCodeFallback("Schr0Smi1ey"),
    fetchCodeChefLegacyFallback("schrosmiley"),
  ]);

  const platforms = {
    codeforces:
      codeforcesResult.status === "fulfilled"
        ? codeforcesResult.value
        : unavailablePlatform(codeforcesResult.reason),
    leetcode:
      leetcodeResult.status === "fulfilled"
        ? leetcodeResult.value
        : unavailablePlatform(leetcodeResult.reason),
    codechef:
      codechefResult.status === "fulfilled"
        ? codechefResult.value
        : unavailablePlatform(codechefResult.reason),
  };

  const successCount = Object.values(platforms).filter(
    (platform) => platform.status === "success",
  ).length;

  return {
    success: successCount === 3,
    partial: successCount > 0 && successCount < 3,
    platforms,
    lastUpdated: new Date().toISOString(),
  };
};

export const useCodingStats = () => {
  const { data, isLoading, refetch, error: queryError } = useQuery({
    queryKey: ["coding-stats"],
    queryFn: async () => {
      try {
        const res = await publicApi.get("/stats/coding", {
          params: {
            codeforcesHandle: "Schr0Smi1ey",
            leetcodeUsername: "Schr0Smi1ey",
            codechefUsername: "schrosmiley",
          },
        });
        return withCodeChefLegacyFallback(res.data);
      } catch {
        return fetchCodingFallback();
      }
    },
    staleTime: 1000 * 60 * 30,
    refetchInterval: 30 * 60 * 1000,
  });

  const stats = {
    codeforces: normalizePlatform(data?.platforms?.codeforces),
    leetcode: normalizePlatform(data?.platforms?.leetcode),
    codechef: normalizePlatform(data?.platforms?.codechef),
  };

  let error = null;
  if (queryError) {
    error = "Coding stats are currently unavailable.";
  } else if (data?.success === false && data?.partial) {
    error = "Some coding platforms are currently unavailable.";
  } else if (data?.success === false) {
    error = "Coding stats are currently unavailable.";
  }

  return {
    stats,
    loading: isLoading,
    error,
    refreshStats: async () => {
      await refetch();
    },
    lastUpdated: data?.lastUpdated ? new Date(data.lastUpdated) : null,
  };
};
