import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { GoogleIcon, Divider } from "../components/ui";
import { OWNER } from "../constants";

const inputCls =
  "w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all";

const InputIcon = ({ icon }) => (
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4">
    {icon}
  </span>
);

const LoginPage = () => {
  const { signInUser, signInWithGoogle, Toast } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);
      Toast("Welcome back!", "success");
      navigate(from, { replace: true });
    } catch (err) {
      Toast(err.message, "error");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      Toast("Signed in with Google!", "success");
      navigate(from, { replace: true });
    } catch (err) {
      let message = err.message;
      if (err.code === "auth/popup-blocked")
        message = "Popup blocked — please allow popups for this site.";
      else if (err.code === "auth/popup-closed-by-user")
        message = "Sign-in cancelled.";
      else if (err.code === "auth/unauthorized-domain")
        message = "This domain is not authorised. Contact support.";
      else if (err.code === "auth/network-request-failed")
        message = "Network error. Check your connection.";

      Toast(message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen background dark:bg-black dark:bg-none flex items-center justify-center px-4 py-20">
      <Helmet>
        <title>Login — {OWNER.name}</title>
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
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl p-8 shadow-sm space-y-5">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-gray-300 transition-all disabled:opacity-60"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <Divider label="or" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <InputIcon icon={<FiMail />} />
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  state={{ email }}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <InputIcon icon={<FiLock />} />
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
                  {showPass ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
