import { useEffect, useState } from "react";
import { Button, Card, LoadingOverlay } from "../../components";
import styles from "./Home.module.css";
import { getTicketsMyDepartmentExecutor } from "../../services/TicketService";
import { notify } from "../../services/notification";
import type { ReportItem } from "../../types/ReportProps";
import { formatDate } from "../../utils/formatDate";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<ReportItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const response = await getTicketsMyDepartmentExecutor(page, limit);
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
      <h2 className={styles.title}>Home</h2>
      <LoadingOverlay isLoading={loading} />
      {tickets.map((item) => (
        <div key={item.id}>
          <Card
            onClick={() => console.log("CLic")}
            id={item.id}
            status={item.status}
            title={item.title}
            description={item.description}
            requester_user={item.requester_user?.username}
            requester_department={item.requester_department?.name}
            executor_department={item.executor_department?.name}
            createdAt={formatDate(item.createdAt)}
            updatedAt={formatDate(item.updatedAt)}
            statusColor="#00ff0d"
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

// <Link to="/ticketdetail" state={{ ticketExemple }}>
//   Ver detalhes
// </Link>

// style={{
//   flex: 1,
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
// }}
