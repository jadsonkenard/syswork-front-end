import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { AuthService } from "../services/AuthService";
import type { User } from "../types/User";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authService = AuthService();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getProfile()
      .then((profile) => setUser(profile))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    try {
      await authService.logout(); // 🔥 chama o back-end
      setUser(null); // 🔥 limpa estado local
    } catch (e) {
      console.error("Erro ao fazer logout", e);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
