import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./../components";
import { Home, Notfound, Login, Reports } from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <Reports />,
            path: "/reports",
          },
        ],
      },
    ],
  },
  {
    element: <Notfound />,
    path: "*",
  },
]);
