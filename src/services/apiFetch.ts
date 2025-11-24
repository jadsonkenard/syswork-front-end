import { BASE_URL } from "../config/api";

export async function apiFetch(url: string, options: RequestInit = {}) {
  // 1 - Primeira tentativa normal
  const response = await fetch(url, {
    ...options,
    credentials: "include", // IMPORTANTE para enviar cookies HttpOnly
  });

  // 2 - Se não for 401 → retorna
  if (response.status !== 401) return response;
  console.log(">>>>PASSOU AQUI 1<<<<<<")

  // 3 - Se for 401 → tenta refresh
  const refresh = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  console.log(">>>>PASSOU AQUI 2<<<<<<")

  if (!refresh.ok) {
    // refresh falhou → usuário realmente não está logado
    return response;
  }

  const data = await refresh.json();
  const newAccessToken = data.accessToken;

  // 4 - Repetir requisição original com novo token
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      Authorization: `Bearer ${newAccessToken}`,
    },
  });
}
