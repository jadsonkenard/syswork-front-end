/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "../api/base_url";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

export class AuthService {
  static me(_toredToken: string) {
      throw new Error("Method not implemented.");
  }
  // salva tokens
  private static saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  // pega tokens
  static getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  // remove tokens
  static clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  // --------------------------
  // LOGIN
  // --------------------------
  static async login(payload: LoginPayload) {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw {
          status: res.status,
          message: errorData?.message || "Erro ao realizar login",
          details: errorData,
        } as ApiError;
      }

      const data = await res.json();

      this.saveTokens(data.accessToken, data.refreshToken);

      return data;
    } catch (err: any) {
      throw this.formatError(err);
    }
  }

  // --------------------------
  // REFRESH TOKEN
  // --------------------------
  static async refreshToken() {
    try {
      const refresh = this.getRefreshToken();
      if (!refresh)
        throw { status: 401, message: "Nenhum refresh token encontrado" };

      const res = await fetch(`${BASE_URL}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refresh }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw {
          status: res.status,
          message: errorData?.message || "Erro ao renovar token",
          details: errorData,
        } as ApiError;
      }

      const data = await res.json();

      this.saveTokens(data.accessToken, data.refreshToken);

      return data;
    } catch (err: any) {
      throw this.formatError(err);
    }
  }

  // --------------------------
  // VERIFICAR USUÁRIO (/me)
  // --------------------------
  static async getMe(): Promise<any> {
    try {
      const token = this.getAccessToken();
      if (!token) throw { status: 401, message: "Não autenticado" };

      const res = await fetch(`${BASE_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        // Se deu 401, tenta usar refresh token automaticamente
        if (res.status === 401) {
          try {
            await this.refreshToken();
            return await this.getMe(); // chama de novo
          } catch (refreshError) {
            this.clearTokens();
            throw { status: 401, message: "Sessão expirada" };
          }
        }

        throw {
          status: res.status,
          message: errorData?.message || "Erro ao obter usuário",
          details: errorData,
        } as ApiError;
      }

      return await res.json();
    } catch (err: any) {
      throw this.formatError(err);
    }
  }

  // --------------------------
  // FORMATA ERRO
  // --------------------------
  private static formatError(err: any): ApiError {
    return {
      status: err?.status || 500,
      message: err?.message || "Erro inesperado",
      details: err?.details || null,
    };
  }
}
