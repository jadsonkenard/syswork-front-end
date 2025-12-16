import { useEffect, useState } from "react";
import { Button, Card, LoadingOverlay } from "../../components";
import styles from "./Home.module.css";
import { getTicketsMyDepartmentExecutor } from "../../services/TicketService";
import { notify } from "../../services/notification";
import { statusLabels, type ReportItem } from "../../types/ReportProps";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<ReportItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  function handleTicket(id: number) {
    navigate("/ticketdetail", {
      state: { id },
    });
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const response = await getTicketsMyDepartmentExecutor(page, limit);
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
      <h2 className={styles.title}>Home</h2>
      <LoadingOverlay isLoading={loading} />
      {(tickets ?? []).map((item) => (
        <div key={item.id}>
          <Card
            onClick={() => handleTicket(item.id)}
            id={item.id}
            title={item.title}
            status={statusLabels[item.status]}
            description={item.description}
            requester_user={item.requester_user?.username}
            requester_department={item.requester_department?.name}
            executor_department={item.executor_department?.name}
            createdAt={formatDate(item.createdAt)}
            updatedAt={formatDate(item.updatedAt)}
            statusColor={
              item.status === "open"
                ? "var(--error-dark)"
                : item.status === "in progress"
                ? "var(--info-dark)"
                : "var(--primary-dark)"
            }
          />
        </div>
      ))}
      <nav className={styles.content}>
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
      </nav>
    </div>
  );
}
