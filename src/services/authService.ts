import { BASE_URL } from "../api/base_url";

export interface User {
  id: number;
  username: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  // -------- LOGIN -------- //
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || "Erro ao fazer login");
    }

    return response.json();
  },

  // -------- PEGAR USUÁRIO PELO TOKEN -------- //
  async me(token: string) {
    const response = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    return response.json();
  },
};
