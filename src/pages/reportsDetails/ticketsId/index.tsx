import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTicketById } from "../../../services/ReportService";
import { notify } from "../../../services/notification";
import { LoadingOverlay } from "../../../components";
import styles from "./TicketsId.module.css";
import { statusLabels, type ReportItem } from "../../../types/ReportProps";
import { formatDate } from "../../../utils/formatDate";

export default function TicketsId() {
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<ReportItem[]>([]);
  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function getTicketsId() {
      try {
        const response = await getTicketById(id);
        console.log(response);
        setTicket([response]);
        setLoading(false);
        notify("success", "Sucesso.");
      } catch (error) {
        if (typeof error === "string") {
          notify("warning", error);
          setLoading(false);
          console.log(error);
        } else if (error instanceof Error) {
          notify("warning", error.message);
          setLoading(false);
          console.log(error.message);
        }
      }
    }
    getTicketsId();
  }, [id]);

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <h3>Chamados por ID</h3>
      <table
        border={1}
        cellPadding="8"
        cellSpacing="0"
        className={styles["tickets-table"]}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Requester User ID</th>
            <th>Requester Department ID</th>
            <th>Executor Department ID</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
          </tr>
        </thead>

        <tbody>
          {ticket.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <p
                  style={{
                    color: "#FFF",
                    fontWeight: "Bold",
                    backgroundColor:
                      item.status === "open"
                        ? "var(--error-dark)"
                        : item.status === "in progress"
                        ? "var(--info-dark)"
                        : "var(--primary-dark)",
                    padding: 5,
                    borderRadius: 4,
                  }}
                >
                  {statusLabels[item.status]}
                </p>
              </td>
              <td>{item.requester_user?.username}</td>
              <td>{item.requester_department?.name}</td>
              <td>{item.executor_department?.name}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{formatDate(item.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
