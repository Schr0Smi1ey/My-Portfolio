import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { RootLayout, PrivateRoute, AdminRoute } from "./components/layout";
import PageTransition from "./components/ui/PageTransition";
import { Spinner } from "./components/ui";

// ── Lazy pages ────────────────────────────────────────────────────────────────
const HomePage        = lazy(() => import("./pages/Home"));
const ProjectsPage    = lazy(() => import("./pages/Projects"));
const ProjectDetails  = lazy(() => import("./pages/ProjectDetails"));
const BlogsPage       = lazy(() => import("./pages/Blogs"));
const DiscussPage     = lazy(() => import("./pages/Discuss"));
const LoginPage       = lazy(() => import("./pages/Login"));
const SignupPage       = lazy(() => import("./pages/Signup"));
const ForgotPassword  = lazy(() => import("./pages/ForgotPassword"));
const ErrorPage       = lazy(() => import("./pages/ErrorPage"));

// Dashboard
const DashboardPage   = lazy(() => import("./pages/dashboard/Dashboard"));
const MessagesPage    = lazy(() => import("./pages/dashboard/Messages"));
const AddProjectPage  = lazy(() => import("./pages/dashboard/AddProject"));
const StatusControl   = lazy(() => import("./pages/dashboard/StatusControl"));

// ── Wrap every lazy page in Suspense + PageTransition ─────────────────────────
const Page = ({ component: Component }) => (
  <Suspense fallback={<Spinner fullPage />}>
    <PageTransition>
      <Component />
    </PageTransition>
  </Suspense>
);

// ── Router ────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Page component={ErrorPage} />,
    children: [
      { index: true,             element: <Page component={HomePage} /> },
      { path: "projects",        element: <Page component={ProjectsPage} /> },
      { path: "projects/:id",    element: <Page component={ProjectDetails} /> },
      { path: "blogs",           element: <Page component={BlogsPage} /> },
      { path: "discuss",         element: <Page component={DiscussPage} /> },
      { path: "login",           element: <Page component={LoginPage} /> },
      { path: "signup",          element: <Page component={SignupPage} /> },
      { path: "forgot-password", element: <Page component={ForgotPassword} /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <Page component={DashboardPage} />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      { index: true,           element: <Navigate to="messages" replace /> },
      { path: "messages",      element: <Page component={MessagesPage} /> },
      { path: "add-project",   element: <Page component={AddProjectPage} /> },
      { path: "status",        element: <Page component={StatusControl} /> },
    ],
  },
  { path: "*", element: <Page component={ErrorPage} /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
