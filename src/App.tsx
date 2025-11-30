import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <Toaster richColors position="bottom-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
