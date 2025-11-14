import styles from "./New-ticket.module.css";

type ButtonNewTicketProps = {
  title: string;
  disabled?: boolean;
  onClick: () => void;
};

export default function ButtonNewTicket({
  title,
  disabled = false,
  onClick,
}: ButtonNewTicketProps) {
  return (
    <button className={styles.container} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
}
