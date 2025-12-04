import { useLocation } from "react-router-dom";
import styles from "./TicketDetail.module.css";
import { Label } from "../../components";

export default function TicketDetail() {
  const title = "Liberação de sistema maria f";
  const description =
    "Solicitoa Instalação da minha impressora no setoe de compras. Solicitoa Instalação da minh";
  const status = "Aberto";
  const usuarioSolicitante = "João";
  const setorSolicitante = "Liberação de sistema maria f";
  const setorExecutante = "Liberação de sistema maria f";
  const criadoEm = "04/12/2025";
  const atualizadoEm = "04/12/2025";

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
      <Label title="Usuário" text={usuarioSolicitante} />
      <nav className={styles.nav}>
        <button>Assumir</button>
        <p>id: {ticketExemple}</p>
        <p>Título: {title}</p>
        <p>Descrição: {description}</p>
        <p>Status: {status}</p>
        <p>Setor solicitante: {setorSolicitante}</p>
        <p>Setor executante: {setorExecutante}</p>
        <p>Usuário solicitante: {usuarioSolicitante}</p>
        <p>Data de criação: {criadoEm}</p>
        <p>Data de atualização: {atualizadoEm}</p>
      </nav>
    </div>
  );
}
