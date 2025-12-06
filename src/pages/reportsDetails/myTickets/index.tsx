import { useEffect, useState } from "react";
import { statusLabels, type ReportItem } from "../../../types/ReportProps";
import { getMyTickets } from "../../../services/ReportService";
import styles from "./MyTickets.module.css";
import { Button, LoadingOverlay } from "../../../components";
import { notify } from "../../../services/notification";

export default function MyTickets() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<ReportItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const response = await getMyTickets(page, limit);
        console.log(response);
        console.log(response.limit);
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
    load();
  }, [page, limit]);

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <h3>Meus chamados</h3>
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
              <td>{item.requester_user?.username}</td>
              <td>{item.requester_department?.name}</td>
              <td>{item.requester_department?.name}</td>
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
