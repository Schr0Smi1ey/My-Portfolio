import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { OWNER } from "../constants";

const inputCls =
  "w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all";

const ForgotPasswordPage = () => {
  const { resetPassword, Toast } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      Toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen background dark:bg-black dark:bg-none flex items-center justify-center px-4 py-20">
      <Helmet>
        <title>Reset Password — Sarafat Karim</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8 space-y-2">
          <Link
            to="/"
            className="text-lg font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent"
          >
            {OWNER.name}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            Reset your password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We'll send a reset link to your email
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center py-4 space-y-4">
              <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white">Check your inbox</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We sent a reset link to <span className="font-medium text-primary">{email}</span>
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2"
              >
                <FiArrowLeft className="w-3.5 h-3.5" /> Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send reset link"}
              </button>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <FiArrowLeft className="w-3.5 h-3.5" /> Back to login
              </Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
