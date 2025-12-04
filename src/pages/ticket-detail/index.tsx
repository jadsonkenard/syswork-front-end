import { useLocation } from "react-router-dom";
import styles from "./TicketDetail.module.css";
import { Label, LoadingOverlay } from "../../components";
import { getTicketById } from "../../services/ReportService";
import { useEffect, useState } from "react";
import { notify } from "../../services/notification";
import type { ReportItem } from "../../types/ReportProps";

export default function TicketDetail() {
  const { state } = useLocation();
  const [ticket, setTicket] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(false);

  const id = state?.ticketExemple;

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
      <h2 className={styles.title}>Detalhes</h2>
      <LoadingOverlay isLoading={loading} />

      {/*
            1- AO CLICAR EM ASSUMIR O STATUS DEVE SER ALTERADO PARA "IN PROGRESS"
            2- BOTÃO DE ASSUMIR DEVE TER UMA RENDERIZAÇÃO CONDICIONAL ONDE, SE O STATUS DO CHAMADO
            FOR IN PROGRESS, O TEXTE DEVER MUDAR PARA CONCLUIR.
            3- ID ID VINDO DA HOME DEVE SER BUSCADO NA API. NOVA ROTA??????
            */}
      <nav className={styles.nav}>
        {ticket.map((item) => (
          <div key={item.id}>
            <Label title="ID" value={`#${item.id}`} />
            <Label title="Usuário solicitante" value={item.requester_user_id} />
            <Label title="Título" value={item.title} />
            <Label title="Status" value={item.status} />
            <Label
              title="Setor solicitante"
              value={item.requester_department_id}
            />
            <Label
              title="Setor executante"
              value={item.executor_department_id}
            />
            <Label title="Criado em" value={item.createdAt} />
            <Label title="Atualizado em" value={item.updatedAt} />
            <Label title="Descrição" value={item.description} />
          </div>
        ))}
      </nav>
    </div>
  );
}
