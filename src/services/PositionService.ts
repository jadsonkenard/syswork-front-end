import { BASE_URL } from "../config/api";
import { apiFetch } from "./apiFetch";

export async function getAllPositions(page: number, limit: number) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/positions/?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Servidor indisponível. Tente novamente mais tarde.");
    }
    console.error("Erro inesperado. ", error);
    throw error;
  }
}
