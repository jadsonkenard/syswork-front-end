import styles from "./New-ticket.module.css";
import { Dots } from "react-activity";

type ButtonNewTicketProps = {
  title: string;
  disabled?: boolean;
  isLoading: boolean;
  onClick: () => void;
};

export default function ButtonNewTicket({
  title,
  disabled = false,
  isLoading = false,
  onClick,
}: ButtonNewTicketProps) {
  return (
    <button className={styles.container} disabled={disabled} onClick={onClick}>
      {isLoading ? <Dots color="#FFF" size={16} /> : title}
    </button>
  );
}
