import { useState } from "react";
import { Button } from "../index";
import SidebarOption from "../sidebar-option";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { notify } from "../../services/notification";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function hendleNotify() {
    notify("warning", "Mensagem de erro");
    setLoading(!loading);
  }

  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>LOGO</div>
        <div className={styles["box-new-ticket"]}>
          <Button
            title="Novo chamado"
            onClick={hendleNotify}
            isLoading={loading}
            height="55px"
            width="240px"
          />
        </div>
        <SidebarOption
          iconName="home"
          title="Home"
          onClick={() => navigate("/")}
        />
        <SidebarOption
          iconName="reports"
          title="Relatórios"
          onClick={() => navigate("/reports")}
        />
        <SidebarOption
          iconName="management"
          title="Gerenciamento de unidade"
          onClick={() => navigate("/management")}
        />
        <SidebarOption
          iconName="user"
          title="Usuários"
          onClick={() => navigate("/user-management")}
        />
      </aside>
    </div>
  );
}
