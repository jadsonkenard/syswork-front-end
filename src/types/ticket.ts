import type { TicketStatus } from "./ReportProps";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  requester_department: string;
  executor_department: string;
  requester_user: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketUpdate {
  title: string;
  description: string;
  status: string;
  requester_department_id: number;
  executor_department_id: number;
}
