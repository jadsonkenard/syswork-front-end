import { useEffect, useState } from "react";
import { AuthContext, type User } from "./AuthContext";
import { authService } from "../services/authService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega usuario automaticamente (se houver token)
  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    async function loadUser() {
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const data = await authService.me(token);
        if (isMounted && data?.user) {
          setUser(data.user);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  async function login(username: string, password: string) {
    const response = await authService.login(username, password);

    localStorage.setItem("token", response.token);
    setUser(response.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
