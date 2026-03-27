import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
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
