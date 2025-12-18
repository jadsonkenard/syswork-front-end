import { useEffect, useState } from "react";
import { statusLabels, type ReportItem } from "../../../types/ReportProps";
import { getMyTickets } from "../../../services/ReportService";
import styles from "./MyTickets.module.css";
import { Button, LoadingOverlay } from "../../../components";
import { notify } from "../../../services/notification";
import { formatDate } from "../../../utils/formatDate";

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
        setTotalPages(response.pages);
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
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Usuário solicitante</th>
            <th>Setor solicitante</th>
            <th>Setor executante</th>
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
              <td>
                <p
                  style={{
                    color: "#FFF",
                    fontWeight: "Bold",
                    backgroundColor:
                      item.status === "open"
                        ? "var(--warning-main)"
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
