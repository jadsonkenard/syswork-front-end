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

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
