import type { TicketDetailProps } from "../../types/ticketDetail";
import styles from "./Card.module.css";

interface ICard extends TicketDetailProps {
  onClick: () => void;
  statusColor: string;
}

export default function Card({ onClick, statusColor, ...props }: ICard) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={styles.item}
        style={{
          width: "0.5%",
          backgroundColor: statusColor,
        }}
      ></div>
      <div className={styles.item} style={{ width: "6%" }}>
        <strong>ID</strong>
        <p>{props.id}</p>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong>Status</strong>
        <p>{props.status}</p>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong>Título</strong>
        <p>{props.title}</p>
      </div>
      <div className={styles.item} style={{ width: "19%" }}>
        <strong>Descrição</strong>
        <p>{props.description}</p>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong>Usuário</strong>
        <p>{props.requester_user}</p>
      </div>
      <div className={styles.item} style={{ width: "12%" }}>
        <strong>Solicitante</strong>
        <p>{props.requester_department}</p>
      </div>
      <div className={styles.item} style={{ width: "12%" }}>
        <strong>Executante</strong>
        <p>{props.executor_department}</p>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong>Criado em</strong>
        <p>{props.createdAt}</p>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong>Atualizado em</strong>
        <p>{props.updatedAt}</p>
      </div>
    </div>
  );
}
