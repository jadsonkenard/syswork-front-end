import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
  const { user, loading } = useAuth();

  // Enquanto verifica o token armazenado (authContext)
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver logado → manda para /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado → libera as rotas internas
  return <Outlet />;
}
