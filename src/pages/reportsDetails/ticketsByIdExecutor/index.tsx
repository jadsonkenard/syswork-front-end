import { useEffect, useState } from "react";
import { getTicketsByIdExecutor } from "../../../services/ReportService";
import { useLocation } from "react-router-dom";
import { notify } from "../../../services/notification";
import styles from "./TicketsByIdExecutor.module.css";
import type { ReportItem } from "../../../types/ReportProps";
import { Button, LoadingOverlay } from "../../../components";

export default function TicketsByIdExecutor() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<ReportItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function getTicketsId() {
      try {
        const response = await getTicketsByIdExecutor(id, page, limit);
        console.log(response);
        setTickets(response.data);
        setLimit(response.limit);
        setTotalPages(response.totalPages);
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
  }, [id, page, limit]);

  const statusLabels = {
    open: "Aberto",
    "in progress": "Em andamento",
    done: "Concluído",
  };

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <h3>Chamados por setor executante</h3>
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
          {tickets.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td
                style={{
                  backgroundColor:
                    item.status === "open"
                      ? "var(--error-dark)"
                      : item.status === "in progress"
                      ? "var(--info-dark)"
                      : "var(--primary-dark)",
                }}
              >
                {statusLabels[item.status]}
              </td>
              <td>{item.requester_user_id}</td>
              <td>{item.requester_department_id}</td>
              <td>{item.executor_department_id}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <Button
          title="Anterior"
          isLoading={false}
          disabled={page === 1}
          height="30px"
          width="100px"
          onClick={() => setPage(page - 1)}
        />
        <Button
          title="Próxima"
          isLoading={false}
          disabled={page === totalPages}
          height="30px"
          width="100px"
          onClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
