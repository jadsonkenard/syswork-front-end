import { useState } from "react";
import { DynamicIcon } from "../../components";
import styles from "./Reports.module.css";
import { useNavigate } from "react-router-dom";
import { ModalId } from "../../components";

export default function Reports() {
  const [isOpen, setIsOpen] = useState(false);
  const [route, setRoute] = useState("");
  const [titleModal, setTitleModal] = useState("");

  function openModal(route: string, title: string) {
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
          onClick={() =>
            openModal("/ticket/ticketsbyid", "Informe o ID do chamado")
          }
        >
          <DynamicIcon
            iconName="report3"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar chamados por ID</p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() =>
            openModal("/ticket/ticketsbyiduser", "Informe o ID do usuário")
          }
        >
          <DynamicIcon
            iconName="report4"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>
            Buscar chamados por ID do usuário
          </p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() =>
            openModal(
              "/ticket/ticketsbyidrequester",
              "Informe o ID do setor solicitante"
            )
          }
        >
          <DynamicIcon
            iconName="report5"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>
            Buscar chamados por setor solicitante
          </p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() =>
            openModal(
              "/ticket/ticketsbyidexecutor",
              "Informe o ID do setor executante"
            )
          }
        >
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
