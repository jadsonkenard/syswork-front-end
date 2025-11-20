/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthService } from "../services/AuthService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializa sessão
  useEffect(() => {
    async function load() {
      try {
        const me = await AuthService.getMe();
        setUser(me);
        setAccessToken(AuthService.getAccessToken());
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  async function login(username: string, password: string) {
    const res = await AuthService.login({ username, password });
    setUser(res.user);
    setAccessToken(res.accessToken);
  }

  function logout() {
    AuthService.clearTokens();
    setUser(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
