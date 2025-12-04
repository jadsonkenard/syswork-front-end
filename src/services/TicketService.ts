import { BASE_URL } from "../config/api";
import { apiFetch } from "./apiFetch";

export async function TicketUpdateStatus(id: number, status: string) {
  try {
    const response = await apiFetch(`${BASE_URL}/ticket/${id}/status/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Erro desconhecido"
      );
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
