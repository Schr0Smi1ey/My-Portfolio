import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import {
  FiCopy,
  FiDownload,
  FiEye,
  FiFileText,
  FiMail,
  FiMessageSquare,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";
import { secureApi } from "../../api";
import { useMessages } from "../../hooks";
import { useAuth } from "../../context/AuthContext";
import { Spinner, EmptyState } from "../../components/ui";
import AnimatedNumber from "../../components/ui/AnimatedNumber";
import deletingAnim from "../../assets/Animation/Deleting.json";
import deletedAnim from "../../assets/Animation/Deleted.json";
import failedAnim from "../../assets/Animation/Failed.json";

Modal.setAppElement("#root");

// ── Download helper ────────────────────────────────────────────────────────────
const downloadFile = async (url, filename) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const link = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(blob),
    download: filename || "file",
  });
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// ── Anim overlay ──────────────────────────────────────────────────────────────
const AnimOverlay = ({ state, onDone }) => {
  if (state === "idle") return null;
  const map = {
    deleting: { data: deletingAnim, loop: true },
    deleted:  { data: deletedAnim,  loop: false },
    failed:   { data: failedAnim,   loop: false },
  };
  const { data, loop } = map[state];
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-48 h-48">
        <Lottie animationData={data} loop={loop} onComplete={state !== "deleting" ? onDone : undefined} />
      </div>
    </div>
  );
};

// ── Badge ────────────────────────────────────────────────────────────────────
const FileBadge = ({ message, onDownload }) =>
  message.fileUrl ? (
    <button
      onClick={onDownload}
      className="inline-flex items-center gap-1.5 text-xs text-primary border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-full hover:bg-primary hover:text-white transition-all"
    >
      <FiDownload className="w-3 h-3" /> Download
    </button>
  ) : (
    <span className="text-xs text-gray-500">—</span>
  );

// ── Messages page ─────────────────────────────────────────────────────────────
const MessagesPage = () => {
  const { Toast } = useAuth();
  const { data: messages = [], isLoading, isFetching, refetch } = useMessages();
  const [selected, setSelected] = useState(null);
  const [animState, setAnimState] = useState("idle"); // idle | deleting | deleted | failed

  const handleDelete = (id, public_id) => {
    Swal.fire({
      title: "Delete message?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#198068",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#18181b",
      color: "#f4f4f5",
    }).then(async ({ isConfirmed }) => {
      if (!isConfirmed) return;
      setAnimState("deleting");
      try {
        const [r1, r2] = await Promise.all([
          secureApi.delete(`/delete-message/${id}`),
          public_id ? secureApi.delete(`/delete-cloudinary/${encodeURIComponent(public_id)}`) : Promise.resolve({ status: 200 }),
        ]);
        if (r1.status === 200 && r2.status === 200) {
          refetch();
          setAnimState("deleted");
        } else throw new Error();
      } catch {
        setAnimState("failed");
      }
    });
  };

  const handleRefresh = async () => {
    await refetch();
    Toast("Messages refreshed.", "success");
  };

  const copyEmail = async (email) => {
    await navigator.clipboard.writeText(email);
    Toast("Email copied.", "success");
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiMessageSquare className="text-primary w-5 h-5" />
            <div>
              <h1 className="text-xl font-black text-zinc-950 dark:text-white">Messages</h1>
              <p className="text-xs text-zinc-500">
                <AnimatedNumber value={messages.length} /> total
              </p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 rounded-xl border border-zinc-300/70 bg-white/55 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-all hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300"
          >
            <FiRefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-primary" : ""}`} />
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Table */}
        {messages.length === 0 ? (
          <EmptyState message="No messages yet." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-300/70 bg-white/60 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-300/70 text-xs uppercase tracking-wider text-zinc-500 dark:border-white/[0.07]">
                    <th className="text-left px-5 py-3 font-medium">Name</th>
                    <th className="text-left px-5 py-3 font-medium">Email</th>
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                    <th className="text-left px-5 py-3 font-medium">Details</th>
                    <th className="text-left px-5 py-3 font-medium">File</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {messages.map((msg, i) => (
                    <motion.tr
                      key={msg._id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="transition-colors hover:bg-primary/[0.04]"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 font-medium text-zinc-950 dark:text-white">{msg.name}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{msg.email}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-zinc-500">
                        {new Date(msg.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setSelected(msg)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300/70 px-2.5 py-1 text-xs text-zinc-600 transition-all hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
                        >
                          <FiEye className="w-3 h-3" /> View
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <FileBadge
                          message={msg}
                          onDownload={() => downloadFile(msg.fileUrl, msg.fileName)}
                        />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(msg._id, msg.public_id)}
                          className="text-zinc-500 transition-colors hover:text-red-400"
                          aria-label="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Details modal */}
      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        className="mx-auto mt-20 w-full max-w-2xl rounded-2xl border border-zinc-300/70 bg-white p-0 shadow-2xl outline-none dark:border-white/10 dark:bg-zinc-950"
        overlayClassName="fixed inset-0 bg-black/65 backdrop-blur-sm flex justify-center items-start z-50 px-4 overflow-y-auto"
      >
        {selected && (
          <div className="overflow-hidden rounded-2xl">
            <div className="border-b border-zinc-300/70 bg-primary/[0.06] p-5 dark:border-white/[0.07]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 font-black text-primary">
                    {selected.name?.slice(0, 1)?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-black text-zinc-950 dark:text-white">
                      {selected.name}
                    </h2>
                    <p className="truncate text-sm text-zinc-500">{selected.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg border border-zinc-300/70 px-2.5 py-1 text-xs text-zinc-500 hover:text-primary dark:border-white/10 dark:hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300/70 bg-white/55 px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300"
                >
                  <FiMail className="h-4 w-4" />
                  Reply
                </a>
                <button
                  type="button"
                  onClick={() => copyEmail(selected.email)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300/70 bg-white/55 px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300"
                >
                  <FiCopy className="h-4 w-4" />
                  Copy email
                </button>
                <div className="inline-flex items-center justify-center rounded-xl border border-zinc-300/70 bg-white/55 px-3 py-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:bg-white/[0.035]">
                  {new Date(selected.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-300/70 bg-white/55 p-4 dark:border-white/10 dark:bg-black/20">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  <FiMessageSquare className="h-4 w-4" />
                  Project details
                </div>
                <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                  {selected.projectDetails}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-300/70 bg-white/55 p-4 dark:border-white/10 dark:bg-black/20">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  <FiFileText className="h-4 w-4" />
                  Attachment
                </div>
                {selected.fileUrl ? (
                  <button
                    type="button"
                    onClick={() => downloadFile(selected.fileUrl, selected.fileName)}
                    className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                  >
                    <FiDownload className="h-4 w-4" />
                    Download {selected.fileName || "file"}
                  </button>
                ) : (
                  <p className="text-sm text-zinc-500">No file attached.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <AnimOverlay state={animState} onDone={() => setAnimState("idle")} />
    </>
  );
};

export default MessagesPage;
