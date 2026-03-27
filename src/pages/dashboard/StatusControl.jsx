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
      className="max-w-xl space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-white">Availability status</h1>
        <p className="text-xs text-gray-500 mt-1">
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
                  : "border-white/8 bg-zinc-900 text-gray-400 hover:border-white/20 hover:text-white"
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
        <p className="text-xs text-gray-500 animate-pulse">Saving…</p>
      )}

      <p className="text-xs text-gray-600">
        Changes appear on your site immediately — no deploy needed.
      </p>
    </motion.div>
  );
};

export default StatusControlPage;
