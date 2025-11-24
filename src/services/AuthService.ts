import { BASE_URL } from "../config/api";
import type { User } from "../types/User";
import { apiFetch } from "./apiFetch";

export interface LoginResponse {
  user: User;
}

export function AuthService() {
  async function login(username: string, password: string): Promise<User> {
    const response = await apiFetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include", // envia e recebe cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao fazer login");
    }

    const data: LoginResponse = await response.json();
    return data.user;
  }

  async function logout(): Promise<void> {
    await apiFetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  }

  async function refresh(): Promise<void> {
    await apiFetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
  }

  async function getProfile(): Promise<User | null> {
    const response = await apiFetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) return null;

    const data: { user: User } = await response.json();
    return data.user;
  }

  return {
    login,
    logout,
    refresh,
    getProfile,
  };
}
