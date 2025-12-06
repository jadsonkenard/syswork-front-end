type TicketStatus = "open" | "in progress" | "done";

export type ReportItem = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  requester_department_id: number;
  executor_department_id: number;
  requester_user_id: number;
  createdAt: string;
  updatedAt: string;
};

export const statusLabels = {
  open: "Aberto",
  "in progress": "Em andamento",
  done: "Concluído",
};
