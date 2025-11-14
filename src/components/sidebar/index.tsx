import { useState } from "react";
import ButtonNewTicket from "../button-new-ticket";
import { Clipboard } from "lucide-react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>LOGO</div>
        <div className={styles["box-new-ticket"]}>
          <ButtonNewTicket
            title="Novo chamado"
            onClick={() => setLoading(!loading)}
            isLoading={loading}
          />
        </div>
        <Clipboard size={20} />
        <p>Opção 1</p>
        <p>Opção 1</p>
        <p>Opção 1</p>
        <p>Opção 1</p>
      </aside>
    </div>
  );
}
