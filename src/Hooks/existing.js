import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { secureApi, publicApi } from "../api";

const fetchStaticProjects = async () => {
  const res = await fetch("/Data/Projects.json");
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
};

export const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await secureApi.get("/isAdmin");
      return res.data?.isAdmin ?? false;
    },
    enabled: !!user?.email && !loading,
    retry: false,
  });

  return { isAdmin, isAdminLoading: isAdminLoading || loading };
};

export const useProjects = () => {
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const res = await publicApi.get("/projects");
        if (Array.isArray(res.data) && res.data.length) return res.data;
      } catch {}
      return fetchStaticProjects();
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  return { projects, isLoading, error };
};

export const useProject = (id) => {
  const { projects, isLoading } = useProjects();
  const project =
    projects.find(
      (p) =>
        String(p._id || "") === String(id) ||
        String(p.slug || "") === String(id) ||
        String(p.id || "") === String(id),
    ) ?? null;
  return { project, isLoading };
};

export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await secureApi.get("/messages");
      return res.data;
    },
  });
};

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const useBlogs = (rssUrl) => {
  return useQuery({
    queryKey: ["blogs", rssUrl],
    queryFn: async () => {
      const res = await fetch(rssUrl);
      if (!res.ok) throw new Error("Failed to load blogs");

      const data = await res.json();

      return (data.items ?? []).map((post) => ({
        ...post,
        slug: createSlug(post.title),
        content: post.content || post.description || "",
      }));
    },
    staleTime: 1000 * 60 * 10,
  });
};
