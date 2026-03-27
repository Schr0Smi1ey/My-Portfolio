import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { secureApi, publicApi } from "../api";

// ─── useAdmin ─────────────────────────────────────────────────────────────────
export const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await secureApi.get("/isAdmin", {
        params: { email: user?.email },
      });
      return res.data?.isAdmin ?? false;
    },
    enabled: !!user?.email && !loading,
    retry: false,
  });

  return { isAdmin, isAdminLoading: isAdminLoading || loading };
};

// ─── useProjects ──────────────────────────────────────────────────────────────
export const useProjects = () => {
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/Data/Projects.json");
      if (!res.ok) throw new Error("Failed to load projects");
      return res.json();
    },
    staleTime: Infinity, // static JSON — never refetch
  });

  return { projects, isLoading, error };
};

// ─── useProject (single) ──────────────────────────────────────────────────────
export const useProject = (id) => {
  const { projects, isLoading } = useProjects();
  const project = projects.find((p) => p.id === Number(id)) ?? null;
  return { project, isLoading };
};

// ─── useMessages ─────────────────────────────────────────────────────────────
export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await secureApi.get("/messages");
      return res.data;
    },
  });
};

// ─── useBlogs ─────────────────────────────────────────────────────────────────
export const useBlogs = (rssUrl) => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(rssUrl);
      if (!res.ok) throw new Error("Failed to load blogs");
      const data = await res.json();
      return data.items ?? [];
    },
    staleTime: 1000 * 60 * 10, // cache 10 min
  });
};
