import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiSave } from "react-icons/fi";
import { publicApi, secureApi } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { getDefaultSiteContent } from "../../hooks/useSiteContent";

const editorCls =
  "min-h-[28rem] w-full rounded-2xl border border-zinc-300/70 bg-white/60 p-4 font-mono text-sm text-zinc-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/[0.035] dark:text-white";

const CONTENT_LABELS = {
  owner: "Owner, contact, and social links",
  about: "About section text, interests, and manual stat cards",
  githubFallbacks: "Manual GitHub stats fallback",
  codingFallbacks: "Manual coding platform stats fallback",
};

const ContentEditor = ({ contentKey }) => {
  const { Toast } = useAuth();
  const queryClient = useQueryClient();
  const [json, setJson] = useState("");
  const [saving, setSaving] = useState(false);
  const fallback = getDefaultSiteContent(contentKey);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-content", contentKey],
    queryFn: async () => {
      const res = await publicApi.get(`/content/${contentKey}`);
      return { ...fallback, ...(res.data?.value || {}) };
    },
    retry: false,
  });

  useEffect(() => {
    setJson(JSON.stringify(data || fallback, null, 2));
  }, [data, fallback]);

  const save = async () => {
    setSaving(true);
    try {
      const value = JSON.parse(json);
      await secureApi.put(`/content/${contentKey}`, { value });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["dashboard-content", contentKey] }),
        queryClient.invalidateQueries({ queryKey: ["site-content", contentKey] }),
        queryClient.invalidateQueries({ queryKey: ["github-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["coding-stats"] }),
      ]);
      Toast("Content saved.", "success");
    } catch (error) {
      Toast(error instanceof SyntaxError ? "Invalid JSON." : "Content save failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Site content
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
            {CONTENT_LABELS[contentKey]}
          </h1>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          <FiSave className="h-4 w-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : (
        <textarea
          value={json}
          onChange={(event) => setJson(event.target.value)}
          spellCheck={false}
          className={editorCls}
        />
      )}
    </div>
  );
};

export const SiteContent = () => <ContentEditor contentKey="owner" />;
export const AboutContent = () => <ContentEditor contentKey="about" />;
export const GitHubFallbacks = () => <ContentEditor contentKey="githubFallbacks" />;
export const CodingFallbacks = () => <ContentEditor contentKey="codingFallbacks" />;

export default ContentEditor;
