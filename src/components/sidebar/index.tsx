import { useState } from "react";
import { Button } from "../index";
import SidebarOption from "../sidebar-option";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>LOGO</div>
        <div className={styles["box-new-ticket"]}>
          <Button
            title="Novo chamado"
            onClick={() => setLoading(!loading)}
            isLoading={loading}
            height="55px"
            width="240px"
          />
        </div>
        <SidebarOption
          iconName="reports"
          title="Relatórios"
          onClick={() => alert("relatório")}
        />
        <SidebarOption
          iconName="management"
          title="Gerenciamento de unidade"
          onClick={() => alert("relatório")}
        />
        <SidebarOption
          iconName="user"
          title="Usuários"
          onClick={() => alert("relatório")}
        />
      </aside>
    </div>
  );
}
