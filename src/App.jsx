import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { RootLayout, PrivateRoute, AdminRoute } from "./components/layout";
import PageTransition from "./components/ui/PageTransition";
import { Spinner } from "./components/ui";
import ClickSpark from "./components/ClickSpark";
import SplashCursor from "./components/SplashCursor";
import { useAuth } from "./context/AuthContext";

const HomePage = lazy(() => import("./pages/Home"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const BlogsPage = lazy(() => import("./pages/Blogs"));
const DiscussPage = lazy(() => import("./pages/Discuss"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const BlogDetailsPageLazy = lazy(() => import("./pages/BlogDetailsPage"));

const DashboardPage = lazy(() => import("./pages/dashboard/Dashboard"));
const MessagesPage = lazy(() => import("./pages/dashboard/Messages"));
const AddProjectPage = lazy(() => import("./pages/dashboard/AddProject"));
const ProjectsManagerPage = lazy(() => import("./pages/dashboard/ProjectsManager"));
const StatusControl = lazy(() => import("./pages/dashboard/StatusControl"));
const PreferencesPage = lazy(() => import("./pages/dashboard/Preferences"));
const SiteContentPage = lazy(() =>
  import("./pages/dashboard/ContentEditor").then((module) => ({
    default: module.SiteContent,
  })),
);
const AboutContentPage = lazy(() =>
  import("./pages/dashboard/ContentEditor").then((module) => ({
    default: module.AboutContent,
  })),
);
const GitHubFallbacksPage = lazy(() =>
  import("./pages/dashboard/ContentEditor").then((module) => ({
    default: module.GitHubFallbacks,
  })),
);
const CodingFallbacksPage = lazy(() =>
  import("./pages/dashboard/ContentEditor").then((module) => ({
    default: module.CodingFallbacks,
  })),
);

const Page = ({ component: Component }) => (
  <Suspense fallback={<Spinner fullPage />}>
    <PageTransition>
      <Component />
    </PageTransition>
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Page component={ErrorPage} />,
    children: [
      { index: true, element: <Page component={HomePage} /> },
      { path: "projects", element: <Page component={ProjectsPage} /> },
      { path: "projects/:id", element: <Page component={ProjectDetails} /> },
      { path: "blogs", element: <Page component={BlogsPage} /> },
      {
        path: "blogs/:slug",
        element: <Page component={BlogDetailsPageLazy} />,
      },
      { path: "discuss", element: <Page component={DiscussPage} /> },
      { path: "login", element: <Page component={LoginPage} /> },
      { path: "signup", element: <Page component={SignupPage} /> },
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
      { index: true, element: <Navigate to="messages" replace /> },
      { path: "messages", element: <Page component={MessagesPage} /> },
      { path: "projects", element: <Page component={ProjectsManagerPage} /> },
      { path: "add-project", element: <Page component={AddProjectPage} /> },
      { path: "status", element: <Page component={StatusControl} /> },
      { path: "preferences", element: <Page component={PreferencesPage} /> },
      { path: "site-content", element: <Page component={SiteContentPage} /> },
      { path: "about-content", element: <Page component={AboutContentPage} /> },
      { path: "github-fallbacks", element: <Page component={GitHubFallbacksPage} /> },
      { path: "coding-fallbacks", element: <Page component={CodingFallbacksPage} /> },
    ],
  },
  { path: "*", element: <Page component={ErrorPage} /> },
]);

const App = () => {
  const { preferences } = useAuth();

  return (
    <>
      <SplashCursor
        DENSITY_DISSIPATION={10}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.05}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR={preferences.primaryColor}
      />

      <ClickSpark
        sparkColor={preferences.primaryColor}
        sparkSize={10}
        sparkRadius={18}
        sparkCount={8}
        duration={400}
      >
        <RouterProvider router={router} />
      </ClickSpark>
    </>
  );
};

export default App;
