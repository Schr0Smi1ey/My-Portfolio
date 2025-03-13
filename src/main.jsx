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
        path: "/discuss-projects",
        element: <DiscussProjects></DiscussProjects>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
