import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  // Se já estiver logado → manda para a Home
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
