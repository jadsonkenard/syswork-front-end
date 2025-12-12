import { DynamicIcon } from "../../components";
import styles from "./Management.module.css";
import { useNavigate } from "react-router-dom";
import { ModalId } from "../../components";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { notify } from "../../services/notification";

export default function Management() {
  const [isOpen, setIsOpen] = useState(false);
  const [route, setRoute] = useState("");
  const [titleModal, setTitleModal] = useState("");

  const { user } = useAuth();

  function openModal(route: string, title: string) {
    if (user?.role === "user") {
      notify("error", "Acesso negado. Requer permissão de administrador.");
      return;
    }
    setTitleModal(title);
    setRoute(route);
    setIsOpen(true);
  }

  function handleConfirm(id: string, route: string) {
    navigate(route, { state: { id } });
    setIsOpen(false);
  }

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
          <p className={styles["box-text"]}>Buscar todas as funções</p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() =>
            openModal("/position/positionbyid", "Informe o ID da função")
          }
        >
          <DynamicIcon
            iconName="report3"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar função por ID</p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/position/newposition")}
        >
          <DynamicIcon
            iconName="report3"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Nova função</p>
        </div>
      </section>
      <ModalId
        isOpen={isOpen}
        route={route}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      >
        <h3>{titleModal}</h3>
      </ModalId>
    </div>
  );
}
