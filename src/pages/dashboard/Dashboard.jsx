import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiMenu } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import DashboardSidebar from "./DashboardSidebar";
import CustomCursor from "../../components/CustomCursor";
import { Spinner } from "../../components/ui";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useAuth();

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Helmet>
        <title>Dashboard — Sarafat Karim</title>
      </Helmet>

      <CustomCursor />

      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 h-14 border-b border-white/5 bg-zinc-950 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
            aria-label="Open menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-white">Dashboard</span>
        </div>

        <main className="flex-1 p-6 lg:p-8">
          {loading ? <Spinner fullPage /> : <Outlet />}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardPage;
