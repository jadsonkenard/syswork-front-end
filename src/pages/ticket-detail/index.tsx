import { useLocation } from "react-router-dom";
import styles from "./TicketDetail.module.css";

export default function TicketDetail() {
  const { state } = useLocation();

  const ticketExemple = state?.ticketExemple;

  console.log(ticketExemple);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes</h2>
      {/*
            1- AO CLICAR EM ASSUMIR O STATUS DEVE SER ALTERADO PARA "IN PROGRESS"
            2- BOTÃO DE ASSUMIR DEVE TER UMA RENDERIZAÇÃO CONDICIONAL ONDE, SE O STATUS DO CHAMADO
            FOR IN PROGRESS, O TEXTE DEVER MUDAR PARA CONCLUIR.
            3- ID ID VINDO DA HOME DEVE SER BUSCADO NA API. NOVA ROTA??????
      */}

      <button>Assumir</button>
      <p>id: {ticketExemple}</p>
      <p>Título: {}</p>
      <p>Descrição: {}</p>
      <p>Status: {}</p>
      <p>Setor solicitante: {}</p>
      <p>Setor executante: {}</p>
      <p>Usuário solicitante: {}</p>
      <p>Data de criação: {}</p>
      <p>Data de atualização: {}</p>
    </div>
  );
}
