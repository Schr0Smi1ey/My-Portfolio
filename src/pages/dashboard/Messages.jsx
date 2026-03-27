import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { FiEye, FiDownload, FiTrash2, FiMessageSquare, FiRefreshCw } from "react-icons/fi";
import { secureApi } from "../../api";
import { useMessages } from "../../hooks";
import { Spinner, EmptyState } from "../../components/ui";
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
  const { data: messages = [], isLoading, refetch } = useMessages();
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
          public_id ? secureApi.delete(`/delete-cloudinary/${public_id}`) : Promise.resolve({ status: 200 }),
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

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiMessageSquare className="text-primary w-5 h-5" />
            <div>
              <h1 className="text-lg font-bold text-white">Messages</h1>
              <p className="text-xs text-gray-500">{messages.length} total</p>
            </div>
          </div>
          <button
            onClick={refetch}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg hover:border-white/20 transition-all"
          >
            <FiRefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>

        {/* Table */}
        {messages.length === 0 ? (
          <EmptyState message="No messages yet." />
        ) : (
          <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
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
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-3.5 font-medium text-white whitespace-nowrap">{msg.name}</td>
                      <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">{msg.email}</td>
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap text-xs">
                        {new Date(msg.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setSelected(msg)}
                          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/10 px-2.5 py-1 rounded-lg hover:border-white/20 transition-all"
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
                          className="text-gray-600 hover:text-red-400 transition-colors"
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
        className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-auto mt-32 shadow-2xl outline-none"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 px-4"
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white">Project details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-white text-xs border border-white/10 px-2.5 py-1 rounded-lg"
              >
                Close
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">From: <span className="text-gray-300">{selected.name} · {selected.email}</span></p>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap border-t border-white/5 pt-4">
              {selected.projectDetails}
            </p>
          </div>
        )}
      </Modal>

      <AnimOverlay state={animState} onDone={() => setAnimState("idle")} />
    </>
  );
};

export default MessagesPage;
