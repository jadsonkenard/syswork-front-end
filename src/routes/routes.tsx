import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./../components";
import { Home, Notfound } from "../pages";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);
