import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../hooks";
import { Spinner } from "../ui";

// ── Root layout ───────────────────────────────────────────────────────────────
export const RootLayout = () => (
  <div className="overflow-x-hidden dark:bg-black dark:text-white">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <ToastContainer />
  </div>
);

// ── PrivateRoute ──────────────────────────────────────────────────────────────
// loading=true  → spinner (JWT cookie may not exist yet — do NOT redirect)
// loading=false, no user → redirect to /login
// loading=false, user exists → allow through
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner fullPage />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

// ── AdminRoute ────────────────────────────────────────────────────────────────
// Wait for BOTH auth and admin checks before making any redirect decision.
// If either is still loading — show spinner.
// This prevents the 403 → interceptor → bounce chain when the cookie
// isn't written yet.
export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  const location = useLocation();

  // Either check still in flight — wait
  if (loading || isAdminLoading) return <Spinner fullPage />;

  // Both resolved — make the access decision
  if (!user || !isAdmin) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};
