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
    <div className="about-cosmic-section fixed inset-0 flex overflow-hidden bg-[#05050a] text-zinc-950 dark:text-white">
      <Helmet>
        <title>Dashboard — Sarafat Karim</title>
      </Helmet>

      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />
      <div className="cosmic-orb cosmic-orb-left" aria-hidden="true" />
      <div className="cosmic-orb cosmic-orb-right" aria-hidden="true" />
      <CustomCursor />

      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="relative z-10 flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-zinc-300/60 bg-white/55 px-4 backdrop-blur-xl dark:border-white/[0.07] dark:bg-black/35 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-300/70 text-zinc-600 transition hover:border-primary/50 hover:text-primary dark:border-white/10 dark:text-zinc-300"
            aria-label="Open menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">Dashboard</span>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {loading ? <Spinner fullPage /> : <Outlet />}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardPage;
