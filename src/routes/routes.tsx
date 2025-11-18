import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./../components";
import { Home, Notfound, Login } from "../pages";

export const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Layout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
    ],
  },
  {
    element: <Notfound />,
    path: "*",
  },
]);
