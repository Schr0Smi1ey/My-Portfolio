import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlusSquare, FiPlus, FiX } from "react-icons/fi";
import { secureApi } from "../../api";
import { useAuth } from "../../context/AuthContext";

const inputCls =
  "w-full px-4 py-2.5 text-sm bg-zinc-800 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all";

const Field = ({ label, hint, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-baseline gap-2">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
      {hint && <span className="text-xs text-gray-600">{hint}</span>}
    </div>
    {children}
  </div>
);

// ── Tag input ──────────────────────────────────────────────────────────────────
const TagInput = ({ label, tags, onChange }) => {
  const [val, setVal] = useState("");
  const add = () => {
    const t = val.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setVal("");
  };
  const remove = (t) => onChange(tags.filter((x) => x !== t));

  return (
    <Field label={label} hint="Press Enter to add">
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder={`Add ${label.toLowerCase()}…`}
          className={inputCls}
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
          <FiPlus className="w-4 h-4" />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
              {t}
              <button type="button" onClick={() => remove(t)}><FiX className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}
    </Field>
  );
};

// ── Feature list item ──────────────────────────────────────────────────────────
const FeatureList = ({ label, items, onChange }) => {
  const add = () => onChange([...items, { title: "", description: "" }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };

  return (
    <Field label={label}>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-zinc-800/50 border border-white/5 rounded-lg relative">
            <input
              value={item.title}
              onChange={(e) => update(i, "title", e.target.value)}
              placeholder="Title"
              className={inputCls}
            />
            <input
              value={item.description}
              onChange={(e) => update(i, "description", e.target.value)}
              placeholder="Description"
              className={inputCls}
            />
            <button type="button" onClick={() => remove(i)} className="absolute top-2 right-2 text-gray-600 hover:text-red-400 transition-colors">
              <FiX className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors">
          <FiPlus className="w-3.5 h-3.5" /> Add {label.toLowerCase()} item
        </button>
      </div>
    </Field>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: "", description: "", image: "", status: "Full-Stack Project",
  liveLink: "", frontendCode: "", backendCode: "",
  techStack: { frontend: [], backend: [], authentication: [], deployment: [] },
  features: [], challenges: [], futurePlans: [],
};

const AddProjectPage = () => {
  const { Toast } = useAuth();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setTech = (cat, val) => setForm((f) => ({ ...f, techStack: { ...f.techStack, [cat]: val } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await secureApi.post("/projects", form);
      Toast("Project added successfully!", "success");
      setForm(EMPTY_FORM);
    } catch {
      Toast("Failed to add project.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <FiPlusSquare className="text-primary w-5 h-5" />
        <div>
          <h1 className="text-lg font-bold text-white">Add project</h1>
          <p className="text-xs text-gray-500">Fill in the details to publish a new project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Basic info */}
        <section className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-300">Basic info</h2>

          <Field label="Project name">
            <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="FitForge — Forge Your Fitness Journey" required className={inputCls} />
          </Field>

          <Field label="Description">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="A short description…" required className={`${inputCls} resize-none`} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Image URL">
              <input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://…" className={inputCls} />
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
                <option>Full-Stack Project</option>
                <option>Frontend Project</option>
                <option>Backend Project</option>
                <option>Open Source</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Live link">
              <input value={form.liveLink} onChange={(e) => set("liveLink", e.target.value)} placeholder="https://…" className={inputCls} />
            </Field>
            <Field label="Frontend repo">
              <input value={form.frontendCode} onChange={(e) => set("frontendCode", e.target.value)} placeholder="https://github.com/…" className={inputCls} />
            </Field>
            <Field label="Backend repo" hint="(optional)">
              <input value={form.backendCode} onChange={(e) => set("backendCode", e.target.value)} placeholder="https://github.com/…" className={inputCls} />
            </Field>
          </div>
        </section>

        {/* Tech stack */}
        <section className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-300">Tech stack</h2>
          {Object.keys(form.techStack).map((cat) => (
            <TagInput key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)} tags={form.techStack[cat]} onChange={(v) => setTech(cat, v)} />
          ))}
        </section>

        {/* Details */}
        <section className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-6">
          <h2 className="text-sm font-semibold text-gray-300">Details</h2>
          <FeatureList label="Features" items={form.features} onChange={(v) => set("features", v)} />
          <FeatureList label="Challenges" items={form.challenges} onChange={(v) => set("challenges", v)} />
          <FeatureList label="Future plans" items={form.futurePlans} onChange={(v) => set("futurePlans", v)} />
        </section>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {loading ? "Publishing…" : "Publish project"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddProjectPage;
