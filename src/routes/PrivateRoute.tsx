import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />; // renderiza as rotas internas
}
