import { DynamicIcon } from "../../components";
import styles from "./Reports.module.css";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Relatorios</h2>
      <section className={styles["box-options"]}>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/ticket/my")}
        >
          <DynamicIcon
            iconName="report1"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Meu chamados</p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/ticket/all")}
        >
          <DynamicIcon
            iconName="report2"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar todos os chamados</p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/ticket/1")}
        >
          <DynamicIcon
            iconName="report3"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar chamados por ID</p>
        </div>
        <div className={styles["box-item"]}>
          <DynamicIcon
            iconName="report4"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>
            Buscar chamados por ID do usuário
          </p>
        </div>
        <div className={styles["box-item"]}>
          <DynamicIcon
            iconName="report5"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>
            Buscar chamados por setor solicitante
          </p>
        </div>
        <div className={styles["box-item"]}>
          <DynamicIcon
            iconName="report6"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>
            Buscar chamados por setor executante
          </p>
        </div>
      </section>
    </div>
  );
}
