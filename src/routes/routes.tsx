import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./../components";
import { Home, Notfound, Login } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
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
        ],
      },
    ],
  },
  {
    element: <Notfound />,
    path: "*",
  },
]);
