import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./../components";
import { Home, Notfound, Login } from "../pages";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Notfound />,
        path: "*",
      },
    ],
  },
]);
