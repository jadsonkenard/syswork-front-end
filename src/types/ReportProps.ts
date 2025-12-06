import { type Department } from "./Department";
import { type User } from "./User";

export type TicketStatus = "open" | "in progress" | "done";

export type ReportItem = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  requester_department_id: Department;
  executor_department_id: Department;
  requester_department: Department;
  executor_department: Department;
  requester_user_id: User;
  requester_user: User;
  createdAt: string;
  updatedAt: string;
};

export const statusLabels = {
  open: "Aberto",
  "in progress": "Em andamento",
  done: "Concluído",
};
