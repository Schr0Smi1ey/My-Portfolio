import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FiEye, FiEyeOff, FiMail, FiLock, FiCheck, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { GoogleIcon, Divider } from "../components/ui";
import { OWNER } from "../constants";

const inputCls =
  "w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all";

// ── Password rules ─────────────────────────────────────────────────────────────
const RULES = [
  { label: "At least 6 characters", test: (p) => p.length >= 6 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
];

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  return (
    <ul className="mt-2 space-y-1">
      {RULES.map(({ label, test }) => {
        const pass = test(password);
        return (
          <li key={label} className={`flex items-center gap-1.5 text-xs ${pass ? "text-green-500" : "text-gray-400"}`}>
            {pass ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
            {label}
          </li>
        );
      })}
    </ul>
  );
};

const SignupPage = () => {
  const { createUser, signInWithGoogle, Toast } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordValid = RULES.every(({ test }) => test(password));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      Toast("Please meet all password requirements.", "error");
      return;
    }
    setLoading(true);
    try {
      await createUser(email, password);
      Toast("Account created! Please verify your email.", "success");
      navigate("/login");
    } catch (err) {
      Toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      Toast("Signed in with Google!", "success");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      Toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen background dark:bg-black dark:bg-none flex items-center justify-center px-4 py-20">
      <Helmet>
        <title>Sign Up — Sarafat Karim</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <Link
            to="/"
            className="text-lg font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent"
          >
            {OWNER.name}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
            Create an account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Join to access the dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl p-8 shadow-sm space-y-5">
          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-gray-300 transition-all disabled:opacity-60"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <Divider label="or" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Email
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

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiLock className="w-4 h-4" />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`${inputCls} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
