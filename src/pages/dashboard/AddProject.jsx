import { useState } from "react";
import { motion } from "framer-motion";
import { FiImage, FiPlusSquare, FiPlus, FiUploadCloud, FiX } from "react-icons/fi";
import { secureApi } from "../../api";
import { useAuth } from "../../context/AuthContext";
import ImageCropModal from "../../components/ui/ImageCropModal";
import { uploadImageToImgBB } from "../../utils/imgbb";

const inputCls =
  "w-full rounded-xl border border-zinc-300/70 bg-white/60 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-zinc-600";

const Field = ({ label, hint, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-baseline gap-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</label>
      {hint && <span className="text-xs text-zinc-500 dark:text-zinc-600">{hint}</span>}
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
          <div key={i} className="relative grid grid-cols-1 gap-2 rounded-xl border border-zinc-300/70 bg-white/45 p-3 dark:border-white/10 dark:bg-black/20 sm:grid-cols-2">
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
  const [cropSource, setCropSource] = useState(null);
  const [cropFileName, setCropFileName] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setTech = (cat, val) => setForm((f) => ({ ...f, techStack: { ...f.techStack, [cat]: val } }));

  const handleImagePick = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Toast("Choose an image file.", "error");
      return;
    }
    setCropFileName(file.name);
    setCropSource(URL.createObjectURL(file));
  };

  const handleCroppedImage = async (file) => {
    setCropSource(null);
    setUploadingImage(true);
    try {
      const url = await uploadImageToImgBB(file);
      set("image", url);
      Toast("Project image uploaded.", "success");
    } catch (error) {
      Toast(error.message || "Image upload failed.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

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
      className="mx-auto max-w-4xl space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <FiPlusSquare className="text-primary w-5 h-5" />
        <div>
          <h1 className="text-xl font-black text-zinc-950 dark:text-white">Add project</h1>
          <p className="text-xs text-zinc-500">Fill in the details to publish a new project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Basic info */}
        <section className="space-y-5 rounded-2xl border border-zinc-300/70 bg-white/60 p-6 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]">
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Basic info</h2>

          <Field label="Project name">
            <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="FitForge — Forge Your Fitness Journey" required className={inputCls} />
          </Field>

          <Field label="Description">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="A short description…" required className={`${inputCls} resize-none`} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Project image">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." className={inputCls} />
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-primary/25 bg-primary/10 px-3 text-primary transition hover:bg-primary hover:text-white">
                    <FiUploadCloud className="h-4 w-4" />
                    <input type="file" accept="image/*" onChange={handleImagePick} className="sr-only" />
                  </label>
                </div>
                <div className="overflow-hidden rounded-xl border border-zinc-300/70 bg-white/45 dark:border-white/10 dark:bg-black/20">
                  {form.image ? (
                    <img src={form.image} alt="Project preview" className="aspect-square w-full object-cover sm:max-w-48" />
                  ) : (
                    <div className="flex aspect-square max-w-48 items-center justify-center text-zinc-400">
                      <FiImage className="h-8 w-8" />
                    </div>
                  )}
                </div>
                {uploadingImage && <p className="text-xs text-zinc-500">Uploading image...</p>}
              </div>
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
        <section className="space-y-5 rounded-2xl border border-zinc-300/70 bg-white/60 p-6 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]">
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Tech stack</h2>
          {Object.keys(form.techStack).map((cat) => (
            <TagInput key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)} tags={form.techStack[cat]} onChange={(v) => setTech(cat, v)} />
          ))}
        </section>

        {/* Details */}
        <section className="space-y-6 rounded-2xl border border-zinc-300/70 bg-white/60 p-6 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]">
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Details</h2>
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
      <ImageCropModal
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        fileName={cropFileName}
        title="Crop Project Image"
        subtitle="Use a square crop so project cards stay consistent."
        cropShape="rect"
        onClose={() => setCropSource(null)}
        onApply={handleCroppedImage}
      />
    </motion.div>
  );
};

export default AddProjectPage;
