import { BASE_URL } from "../config/api";
import { apiFetch } from "./apiFetch";

export async function getAllDepartments() {
  try {
    const response = await apiFetch(`${BASE_URL}/department`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
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
