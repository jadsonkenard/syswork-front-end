import { BASE_URL } from "../config/api";
import { apiFetch } from "./apiFetch";

export async function getTickets(mode: string | undefined) {
  const isNumber = /^\d+$/.test(mode ?? "");

  const url = isNumber
    ? `${BASE_URL}/ticket/${mode}` // ID específico
    : `${BASE_URL}/ticket/${mode}`;
  try {
    const response = await apiFetch(`${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

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
