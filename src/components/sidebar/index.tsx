import { useState } from "react";
import ButtonNewTicket from "../button-new-ticket";
import SidebarOption from "../sidebar-option";
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
        <SidebarOption title="Relatórios" />
        <SidebarOption title="Relatórios" />
      </aside>
    </div>
  );
}
