import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useAvailabilityStatus, useUpdateStatus } from "../../hooks";
import { STATUS_OPTIONS } from "../../constants";

const COLOR_CLASSES = {
  green:  "border-green-500  bg-green-50  dark:bg-green-900/20  text-green-700  dark:text-green-300",
  blue:   "border-blue-500   bg-blue-50   dark:bg-blue-900/20   text-blue-700   dark:text-blue-300",
  yellow: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
  red:    "border-red-500    bg-red-50    dark:bg-red-900/20    text-red-700    dark:text-red-300",
};

const StatusControlPage = () => {
  const { status: current, isLoading, refetch } = useAvailabilityStatus();
  const updateStatus = useUpdateStatus();
  const [saving, setSaving] = useState(false);

  const handleSelect = async (value) => {
    if (value === current || saving) return;
    setSaving(true);
    await updateStatus(value, refetch);
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-zinc-300/70 bg-white/60 p-6 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-zinc-950 dark:text-white">Availability status</h1>
        <p className="mt-1 text-xs text-zinc-500">
          Controls the badge visible on your homepage banner in real time.
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {STATUS_OPTIONS.map((opt) => {
          const isActive = current === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              disabled={isLoading || saving}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all text-left ${
                isActive
                  ? COLOR_CLASSES[opt.color]
                  : "border-zinc-300/70 bg-white/50 text-zinc-600 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-black/20 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
              } disabled:opacity-50`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    opt.color === "green"  ? "bg-green-500"  :
                    opt.color === "blue"   ? "bg-blue-500"   :
                    opt.color === "yellow" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                />
                <span className="font-medium text-sm">{opt.label}</span>
              </div>
              {isActive && <FiCheckCircle className="w-4 h-4 shrink-0" />}
            </button>
          );
        })}
      </div>

      {saving && (
        <p className="animate-pulse text-xs text-zinc-500">Saving…</p>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-600">
        Changes appear on your site immediately - no deploy needed.
      </p>
    </motion.div>
  );
};

export default StatusControlPage;
