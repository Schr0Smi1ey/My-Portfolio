import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FiEdit2, FiPlus, FiSave, FiTrash2, FiX } from "react-icons/fi";
import { publicApi, secureApi } from "../../api";
import { useAuth } from "../../context/AuthContext";

const inputCls =
  "w-full rounded-xl border border-zinc-300/70 bg-white/60 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-zinc-600";

const EMPTY_PROJECT = {
  name: "",
  description: "",
  image: "",
  status: "Full-Stack Project",
  liveLink: "",
  frontendCode: "",
  backendCode: "",
  order: 0,
  techStack: { frontend: [], backend: [], authentication: [], deployment: [] },
  features: [],
  challenges: [],
  futurePlans: [],
};

const csvToArray = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const arrayToCsv = (value) => (Array.isArray(value) ? value.join(", ") : "");

const listToText = (value) =>
  Array.isArray(value)
    ? value
        .map((item) =>
          typeof item === "string"
            ? item
            : `${item.title || ""}|${item.description || ""}`,
        )
        .join("\n")
    : "";

const textToList = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [title, ...description] = item.split("|");
      return description.length
        ? { title: title.trim(), description: description.join("|").trim() }
        : item;
    });

const getProjectId = (project) => project?._id || project?.id || project?.slug;

const ProjectField = ({ label, children }) => (
  <label className="space-y-1.5">
    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
      {label}
    </span>
    {children}
  </label>
);

const ProjectsManager = () => {
  const { Toast } = useAuth();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [saving, setSaving] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["dashboard-projects"],
    queryFn: async () => {
      const res = await publicApi.get("/projects");
      return Array.isArray(res.data) ? res.data : [];
    },
    retry: false,
  });

  const sortedProjects = useMemo(
    () =>
      [...projects].sort(
        (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0),
      ),
    [projects],
  );

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_PROJECT);
  };

  const editProject = (project) => {
    setEditingId(getProjectId(project));
    setForm({
      ...EMPTY_PROJECT,
      ...project,
      techStack: { ...EMPTY_PROJECT.techStack, ...(project.techStack || {}) },
    });
  };

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const setTech = (key, value) =>
    setForm((current) => ({
      ...current,
      techStack: { ...current.techStack, [key]: csvToArray(value) },
    }));

  const refetchProjects = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["dashboard-projects"] }),
      queryClient.invalidateQueries({ queryKey: ["projects"] }),
    ]);
  };

  const saveProject = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) await secureApi.put(`/projects/${editingId}`, form);
      else await secureApi.post("/projects", form);
      Toast(editingId ? "Project updated." : "Project created.", "success");
      resetForm();
      await refetchProjects();
    } catch {
      Toast("Project save failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (project) => {
    const result = await Swal.fire({
      title: "Delete project?",
      text: project.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ef4444",
      background: "#09090b",
      color: "#fff",
    });
    if (!result.isConfirmed) return;

    try {
      await secureApi.delete(`/projects/${getProjectId(project)}`);
      Toast("Project deleted.", "success");
      await refetchProjects();
      if (editingId === getProjectId(project)) resetForm();
    } catch {
      Toast("Project delete failed.", "error");
    }
  };

  useEffect(() => {
    if (!editingId) setForm(EMPTY_PROJECT);
  }, [editingId]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Content database
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
            Projects
          </h1>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          <FiPlus className="h-4 w-4" />
          New project
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-2xl border border-zinc-300/70 bg-white/60 p-5 backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]">
          <h2 className="mb-4 text-sm font-semibold text-zinc-950 dark:text-white">
            Current projects
          </h2>
          <div className="space-y-3">
            {isLoading && <p className="text-sm text-zinc-500">Loading...</p>}
            {sortedProjects.map((project) => (
              <div
                key={getProjectId(project)}
                className="flex gap-3 rounded-xl border border-zinc-300/70 bg-white/45 p-3 dark:border-white/10 dark:bg-black/20"
              >
                <img
                  src={project.image}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
                    {project.name}
                  </p>
                  <p className="line-clamp-2 text-xs text-zinc-500">
                    {project.description}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => editProject(project)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-300/70 text-zinc-600 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-zinc-300"
                    aria-label="Edit project"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProject(project)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-300/70 text-red-500 hover:border-red-500/40 dark:border-white/10"
                    aria-label="Delete project"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={saveProject}
          className="space-y-4 rounded-2xl border border-zinc-300/70 bg-white/60 p-5 backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-zinc-950 dark:text-white">
              {editingId ? "Edit project" : "Create project"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-primary"
              >
                <FiX /> Cancel
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectField label="Name">
              <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </ProjectField>
            <ProjectField label="Status">
              <input className={inputCls} value={form.status} onChange={(e) => set("status", e.target.value)} />
            </ProjectField>
          </div>

          <ProjectField label="Description">
            <textarea className={`${inputCls} min-h-24 resize-y`} value={form.description} onChange={(e) => set("description", e.target.value)} required />
          </ProjectField>

          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectField label="Image URL">
              <input className={inputCls} value={form.image} onChange={(e) => set("image", e.target.value)} />
            </ProjectField>
            <ProjectField label="Order">
              <input type="number" className={inputCls} value={form.order || 0} onChange={(e) => set("order", Number(e.target.value))} />
            </ProjectField>
            <ProjectField label="Live link">
              <input className={inputCls} value={form.liveLink} onChange={(e) => set("liveLink", e.target.value)} />
            </ProjectField>
            <ProjectField label="Frontend repo">
              <input className={inputCls} value={form.frontendCode} onChange={(e) => set("frontendCode", e.target.value)} />
            </ProjectField>
            <ProjectField label="Backend repo">
              <input className={inputCls} value={form.backendCode} onChange={(e) => set("backendCode", e.target.value)} />
            </ProjectField>
            <ProjectField label="Slug">
              <input className={inputCls} value={form.slug || ""} onChange={(e) => set("slug", e.target.value)} />
            </ProjectField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {Object.keys(EMPTY_PROJECT.techStack).map((key) => (
              <ProjectField key={key} label={`${key} tech, comma separated`}>
                <input className={inputCls} value={arrayToCsv(form.techStack?.[key])} onChange={(e) => setTech(key, e.target.value)} />
              </ProjectField>
            ))}
          </div>

          {["features", "challenges", "futurePlans"].map((key) => (
            <ProjectField key={key} label={`${key} one per line, optional title|description`}>
              <textarea
                className={`${inputCls} min-h-24 resize-y font-mono`}
                value={listToText(form[key])}
                onChange={(e) => set(key, textToList(e.target.value))}
              />
            </ProjectField>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            <FiSave className="h-4 w-4" />
            {saving ? "Saving..." : "Save project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectsManager;
