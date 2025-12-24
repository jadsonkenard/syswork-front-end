import { DynamicIcon } from "../../components";
import styles from "./User-management.module.css";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciamento de usuários</h2>
      <section className={styles["box-options"]}>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/user/listusers")}
        >
          <DynamicIcon
            iconName="report1"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar usuários</p>
        </div>
      </section>
    </div>
  );
}
