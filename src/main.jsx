import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/Shared/ErrorPage/ErrorPage";
import Root from "./Components/Layout/Root";
import Home from "./Components/Pages/Home/Home";
import ProjectDetails from "./Components/DetailsPage/ProjectDetails";
import Projects from "./Components/Pages/Projects/Projects";
import DiscussProjects from "./Components/Pages/DiscussProjects/DiscussProjects";
import Blogs from "./Components/Pages/Blogs/Blogs";
import AuthProvider from "./Contexts/AuthContext/AuthProvider";
import SignUp from "./Components/Forms/SignUp";
import Login from "./Components/Forms/LogIn";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AdminRoute from "./PrivateRoute/AdminRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Messages from "./Components/Pages/Dashboard/Messages/Messages";
import AddProject from "./Components/Pages/Dashboard/Add Project/AddProject";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/project-details/:id",
        element: <ProjectDetails></ProjectDetails>,
      },
      {
        path: "/projects",
        element: <Projects></Projects>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/discuss-projects",
        element: <DiscussProjects></DiscussProjects>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Dashboard></Dashboard>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/signup-karim",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login-karim",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <Dashboard></Dashboard>
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "messages",
        element: <Messages></Messages>,
      },
      {
        path: "add-project",
        element: <AddProject></AddProject>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
