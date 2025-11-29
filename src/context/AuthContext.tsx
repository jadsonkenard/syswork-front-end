import { createContext } from "react";
import type { AuthContextProps } from "../types/AuthContextProps";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
