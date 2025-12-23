import type { TicketDetailProps } from "../../types/ticket";
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
        <strong className={styles.title}>ID</strong>
        <strong>{props.id}</strong>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong className={styles.title}>Status</strong>
        <strong>{props.status}</strong>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong className={styles.title}>Título</strong>
        <strong>{props.title}</strong>
      </div>
      <div className={styles.item} style={{ width: "19%" }}>
        <strong className={styles.title}>Descrição</strong>
        <strong>{props.description}</strong>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong className={styles.title}>Usuário</strong>
        <strong>{props.requester_user}</strong>
      </div>
      <div className={styles.item} style={{ width: "12%" }}>
        <strong className={styles.title}>Solicitante</strong>
        <strong>{props.requester_department}</strong>
      </div>
      <div className={styles.item} style={{ width: "12%" }}>
        <strong className={styles.title}>Executante</strong>
        <strong>{props.executor_department}</strong>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong className={styles.title}>Criado em</strong>
        <strong>{props.createdAt}</strong>
      </div>
      <div className={styles.item} style={{ width: "10%" }}>
        <strong className={styles.title}>Atualizado em</strong>
        <strong>{props.updatedAt}</strong>
      </div>
    </div>
  );
}
