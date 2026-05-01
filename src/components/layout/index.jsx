import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../hooks";
import { Spinner } from "../ui";
import CustomCursor from "../CustomCursor";

export const RootLayout = () => (
  <div className="overflow-x-hidden dark:bg-black dark:text-white">
    <CustomCursor />
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <ToastContainer />
  </div>
);

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner fullPage />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) return <Spinner fullPage />;

  if (!user || !isAdmin) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};
