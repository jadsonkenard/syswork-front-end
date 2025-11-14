import { createBrowserRouter } from "react-router-dom";
import { Home, Notfound } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
