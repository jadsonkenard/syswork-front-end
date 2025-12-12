import { DynamicIcon } from "../../components";
import styles from "./Management.module.css";
import { useNavigate } from "react-router-dom";

export default function Management() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciamento de unidade</h2>
      <section className={styles["box-options"]}>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/positions/all")}
        >
          <DynamicIcon
            iconName="report2"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar todos os chamados</p>
        </div>
      </section>
    </div>
  );
}
