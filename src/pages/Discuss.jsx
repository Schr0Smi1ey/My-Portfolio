import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
import Lottie from "lottie-react";
import { IoCloseCircle } from "react-icons/io5";
import { FiMail, FiLinkedin, FiPaperclip } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { publicApi } from "../api";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET, OWNER, SOCIAL_LINKS, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, ACCEPTED_FILE_TYPES } from "../constants";
import { PageWrapper, SectionHeader, PrimaryButton } from "../components/ui";
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

// ── InputField ────────────────────────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const inputCls = "w-full bg-transparent px-4 py-2.5 text-sm border border-gray-200 dark:border-white/15 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all";

// ── ContactBadge ──────────────────────────────────────────────────────────────
const ContactBadge = ({ icon, label, href, outline }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
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
        name: fd.get("name"),
        email: fd.get("email"),
        projectDetails: fd.get("projectDetails"),
        fileUrl, fileName, public_id,
        date: new Date().toISOString(),
      });

      if (res.status === 200 || res.status === 201) {
        e.target.reset();
        removeFile();
        setStatus({ sending: false, sent: true, failed: false });
      } else throw new Error();
    } catch {
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
            placeholder="Tell me about your project — goals, timeline, tech preferences…"
            required
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="Attach a file (optional)">
          <div className="relative">
            <input
              ref={fileRef}
              type="file"
              name="file"
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFile}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            />
            <div className="flex items-center gap-3 px-4 py-2.5 border border-dashed border-gray-200 dark:border-white/15 rounded-lg hover:border-primary/40 transition-colors cursor-pointer">
              <FiPaperclip className="text-gray-400 w-4 h-4" />
              <span className="text-sm text-gray-400">
                {file ? file.name : `JPG, PNG, PDF · max ${MAX_FILE_SIZE_MB}MB`}
              </span>
              {file && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  className="ml-auto text-red-400 hover:text-red-500"
                >
                  <IoCloseCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </Field>

        <PrimaryButton type="submit" disabled={status.sending} className="w-full">
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
  <PageWrapper>
    <Helmet>
      <title>Discuss a Project — Sarafat Karim</title>
    </Helmet>

    <div className="container mx-auto max-w-3xl">
      <SectionHeader
        eyebrow="Let's work together"
        title="Discuss a project"
        subtitle="Have an idea? Need a developer? Drop me a message and let's build something great."
      />

      {/* Contact shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        <ContactBadge icon={<FiMail className="w-4 h-4" />} label="Email me" href={`mailto:${OWNER.email}`} />
        <ContactBadge icon={<FiLinkedin className="w-4 h-4" />} label="LinkedIn" href={SOCIAL_LINKS.linkedin} outline />
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl p-7 md:p-10 shadow-sm"
      >
        <ContactForm />
      </motion.div>
    </div>
  </PageWrapper>
);

export default DiscussPage;
