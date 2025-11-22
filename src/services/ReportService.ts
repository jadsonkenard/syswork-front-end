import { BASE_URL } from "../config/api";

export async function getTickets(token: string, mode: string | undefined) {
  const isNumber = /^\d+$/.test(mode ?? "");

  const url = isNumber
    ? `${BASE_URL}ticket/${mode}` // ID específico
    : `${BASE_URL}ticket/${mode}`;
  try {
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
