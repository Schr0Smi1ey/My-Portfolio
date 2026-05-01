import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
import Lottie from "lottie-react";
import { IoCloseCircle } from "react-icons/io5";
import { FiMail, FiLinkedin, FiPaperclip, FiSend } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { publicApi } from "../api";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET, OWNER, SOCIAL_LINKS, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, ACCEPTED_FILE_TYPES } from "../constants";
import { PageWrapper, PrimaryButton } from "../components/ui";
import Sending from "../assets/Animation/Send-Message-1.json";
import SendSuccess from "../assets/Animation/Send-Success.json";
import SendFailed from "../assets/Animation/Failed.json";

// ── StatusOverlay ─────────────────────────────────────────────────────────────
const StatusOverlay = ({ sending, sent, failed, onDone }) => {
  if (!sending && !sent && !failed) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-56 h-56">
        {sending && <Lottie animationData={Sending} loop />}
        {sent && <Lottie animationData={SendSuccess} loop={false} onComplete={onDone} />}
        {failed && <Lottie animationData={SendFailed} loop={false} onComplete={onDone} />}
      </div>
    </div>
  );
};

const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const inputCls = "w-full rounded-xl border border-zinc-300/70 bg-white/70 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-600";

// ── ContactBadge ──────────────────────────────────────────────────────────────
const ContactBadge = ({ icon, label, href, outline }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
      outline
        ? "border-2 border-primary text-primary hover:bg-primary hover:text-white"
        : "bg-primary text-white hover:bg-primary/90"
    }`}
  >
    {icon} {label}
  </a>
);

// ── ContactForm ───────────────────────────────────────────────────────────────
const ContactForm = () => {
  const { Toast } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ sending: false, sent: false, failed: false });
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const accepted = ["image/", "application/pdf"];
    if (!accepted.some((type) => f.type.startsWith(type))) {
      Toast("Attach an image or PDF only.", "error");
      e.target.value = "";
      return;
    }
    if (f.size > MAX_FILE_SIZE_BYTES) {
      Toast(`File must be under ${MAX_FILE_SIZE_MB}MB`, "error");
      e.target.value = "";
      return;
    }
    setFile(f);
  };

  const removeFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const message = {
      name: fd.get("name")?.trim(),
      email: fd.get("email")?.trim(),
      projectDetails: fd.get("projectDetails")?.trim(),
    };

    if (!message.name || !message.email || !message.projectDetails) {
      Toast("Name, email, and project details are required.", "error");
      return;
    }

    setStatus({ sending: true, sent: false, failed: false });

    try {
      let fileUrl = null, fileName = null, public_id = null;

      if (file) {
        const upload = new FormData();
        upload.append("file", file);
        upload.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        upload.append("resource_type", "auto");
        const { data } = await axios.post(CLOUDINARY_UPLOAD_URL, upload);
        fileUrl = data.secure_url;
        fileName = data.original_filename;
        public_id = data.public_id;
      }

      const res = await publicApi.post("/messages", {
        ...message,
        fileUrl, fileName, public_id,
        date: new Date().toISOString(),
      });

      if (res.status === 200 || res.status === 201) {
        e.target.reset();
        removeFile();
        setStatus({ sending: false, sent: true, failed: false });
      } else throw new Error();
    } catch (error) {
      Toast(error?.response?.data?.message || "Message failed to send.", "error");
      setStatus({ sending: false, sent: false, failed: true });
    }
  };

  const clearStatus = () => setStatus({ sending: false, sent: false, failed: false });

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Your name">
            <input type="text" name="name" placeholder="Sarafat Karim" required className={inputCls} />
          </Field>
          <Field label="Your email">
            <input type="email" name="email" placeholder="you@email.com" required className={inputCls} />
          </Field>
        </div>

        <Field label="Project details">
          <textarea
            name="projectDetails"
            rows={5}
            placeholder="Tell me about your project: goals, timeline, tech preferences..."
            required
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="Attach a file (optional)">
          <label className="block cursor-pointer">
            <input
              ref={fileRef}
              type="file"
              name="file"
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFile}
              className="sr-only"
            />
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-zinc-300/70 bg-white/50 px-4 py-3 transition-colors hover:border-primary/50 dark:border-white/10 dark:bg-white/[0.02]">
              <FiPaperclip className="h-4 w-4 text-zinc-400" />
              <span className="min-w-0 flex-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                {file ? file.name : `JPG, PNG, PDF · max ${MAX_FILE_SIZE_MB}MB`}
              </span>
              {file && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  className="text-red-400 hover:text-red-500"
                  aria-label="Remove file"
                >
                  <IoCloseCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </label>
        </Field>

        <PrimaryButton type="submit" disabled={status.sending} className="inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70">
          <FiSend className="h-4 w-4" />
          {status.sending ? "Sending…" : "Send message"}
        </PrimaryButton>
      </form>

      <StatusOverlay
        sending={status.sending}
        sent={status.sent}
        failed={status.failed}
        onDone={clearStatus}
      />
    </>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const DiscussPage = () => (
  <PageWrapper className="!px-0 !pt-0 !pb-0">
    <Helmet>
      <title>Discuss a Project — Sarafat Karim</title>
    </Helmet>

    <section className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 !mt-0 !pt-28 !pb-20 text-zinc-950 dark:text-white md:px-8 md:!pt-32 md:!pb-24">
      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />
      <div className="cosmic-orb cosmic-orb-left" aria-hidden="true" />
      <div className="cosmic-orb cosmic-orb-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em] text-zinc-500">
            Let's work together
          </p>
          <h1 className="mt-5 font-display text-5xl font-black leading-[0.9] tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
            Discuss a{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              Project
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[0.88rem] leading-7 text-zinc-600 dark:text-zinc-500">
            Have an idea? Need a developer? Send the details and I will get back to you.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          <ContactBadge icon={<FiMail className="h-4 w-4" />} label="Email me" href={`mailto:${OWNER.email}`} />
          <ContactBadge icon={<FiLinkedin className="h-4 w-4" />} label="LinkedIn" href={SOCIAL_LINKS.linkedin} outline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-2xl border border-zinc-300/70 bg-white/70 p-6 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.06)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.03] md:p-8"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  </PageWrapper>
);

export default DiscussPage;
