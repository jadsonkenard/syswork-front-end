import { BASE_URL } from "../config/api";
import { apiFetch } from "./apiFetch";
import type { NewTicketForm } from "../types/newTicket";

export async function NewTicketStore(newTicket: NewTicketForm) {
  try {
    const response = await apiFetch(`${BASE_URL}/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newTicket),
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

export async function ticketUpdateStatus(id: number, status: string) {
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

export async function getTicketsMyDepartmentExecutor(
  page: number,
  limit: number
) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/department/executor/my?page=${page}&limit=${limit}`,
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
