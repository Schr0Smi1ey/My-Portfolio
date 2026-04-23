import React from "react";
import ReactDOM from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ── AOS — initialized once globally ──────────────────────────────────────────
AOS.init({ duration: 500, once: true, offset: 60 });

// ── React Query client ────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
