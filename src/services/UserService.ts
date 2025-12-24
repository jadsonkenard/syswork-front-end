import { BASE_URL } from "../config/api";
import { apiFetch } from "./apiFetch";

export async function getAllUsers(page: number, limit: number) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/users?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

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
