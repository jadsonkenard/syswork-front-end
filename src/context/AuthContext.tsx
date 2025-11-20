import { createContext } from "react";

export interface AuthContextType {
  user: unknown;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
