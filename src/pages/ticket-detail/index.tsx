import { useLocation } from "react-router-dom";
import styles from "./TicketDetail.module.css";
import { Button, Label, LoadingOverlay } from "../../components";
import { getTicketById } from "../../services/ReportService";
import { useEffect, useState } from "react";
import { notify } from "../../services/notification";
import { statusLabels, type ReportItem } from "../../types/ReportProps";
import { ticketUpdateStatus } from "../../services/TicketService";
import { formatDate } from "../../utils/formatDate";

export default function TicketDetail() {
  const { state } = useLocation();
  const [ticket, setTicket] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(false);

  const id = state?.id;

  async function updateStatus(id: number, currentStatus: string) {
    const nextStatus = getNextStatus(currentStatus);
    setLoading(true);
    try {
      await ticketUpdateStatus(id, nextStatus);
      const updated = await getTicketById(id);

      setTicket([updated]);
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

  function getNextStatus(currentStatus: string) {
    switch (currentStatus) {
      case "open":
        return "in progress";

      case "in progress":
        return "done";

      default:
        return currentStatus;
    }
  }

  useEffect(() => {
    async function getTicketId() {
      setLoading(true);
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
    getTicketId();
  }, [id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes</h2>
      <LoadingOverlay isLoading={loading} />
      <nav className={styles.nav}>
        {(ticket ?? []).map((item) => (
          <div key={item.id} className={styles.item}>
            <Button
              title={
                item.status === "open"
                  ? "Assumir"
                  : item.status === "in progress"
                  ? "Finalizar"
                  : "Concluído"
              }
              backgroundColor={
                item.status === "open"
                  ? "var(--error-dark)"
                  : item.status === "in progress"
                  ? "var(--info-dark)"
                  : "var(--primary-dark)"
              }
              isLoading={false}
              onClick={() => updateStatus(item.id, item.status)}
            />
            <Label iconName="id" title="ID" value={`#${item.id}`} />
            <Label
              iconName="userCheck"
              title="Usuário solicitante"
              value={item.requester_user?.username}
            />
            <Label iconName="info" title="Título" value={item.title} />
            <Label
              iconName="status"
              title="Status"
              value={statusLabels[item.status]}
              valueColor={
                item.status === "open"
                  ? "var(--error-dark)"
                  : item.status === "in progress"
                  ? "var(--info-dark)"
                  : "var(--primary-dark)"
              }
            />
            <Label
              iconName="department1"
              title="Setor solicitante"
              value={item.requester_department?.name}
            />
            <Label
              iconName="department2"
              title="Setor executante"
              value={item.executor_department?.name}
            />
            <Label
              iconName="time1"
              title="Criado em"
              value={formatDate(item.createdAt)}
            />
            <Label
              iconName="time2"
              title="Atualizado em"
              value={formatDate(item.updatedAt)}
            />
            <Label
              iconName="question"
              title="Descrição"
              value={item.description}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
