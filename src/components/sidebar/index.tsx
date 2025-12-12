import { Button } from "../index";
import SidebarOption from "../sidebar-option";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { notify } from "../../services/notification";

export default function Sidebar() {
  const navigate = useNavigate();

  const { user } = useAuth();

  function navAdmin(route: string) {
    if (user?.role === "user") {
      notify("error", "Acesso negado. Requer permissão de administrador.");
      return;
    }
    navigate(route);
  }

  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>LOGO</div>
        <div className={styles["box-new-ticket"]}>
          <Button
            title="Novo chamado"
            onClick={() => navigate("/newticket")}
            isLoading={false}
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
          onClick={() => navAdmin("/management")}
        />
        <SidebarOption
          iconName="user"
          title="Usuários"
          onClick={() => navAdmin("/user-management")}
        />
      </aside>
    </div>
  );
}
