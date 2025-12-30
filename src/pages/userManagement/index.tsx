import { useState } from "react";
import { DynamicIcon, ModalId } from "../../components";
import styles from "./User-management.module.css";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [route, setRoute] = useState("");
  const [titleModal, setTitleModal] = useState("");

  const navigate = useNavigate();

  function openModal(route: string, title: string) {
    setTitleModal(title);
    setRoute(route);
    setIsOpen(true);
  }

  function handleConfirm(id: string, route: string) {
    if (!id || !route) {
      setIsOpen(true);
      return;
    }
    navigate(route, { state: { id } });
    setIsOpen(false);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciamento de usuários</h2>
      <section className={styles["box-options"]}>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/user/listusers")}
        >
          <DynamicIcon
            iconName="userRoundSearch"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar usuários</p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() => navigate("/user/newuser")}
        >
          <DynamicIcon
            iconName="userPlus"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Novo usuário</p>
        </div>
        <div
          className={styles["box-item"]}
          onClick={() =>
            openModal("/user/userdatail", "Informe o ID do usuário")
          }
        >
          <DynamicIcon
            iconName="userCog"
            color="var(--neutral-500)"
            size={80}
          />
          <p className={styles["box-text"]}>Buscar usuário por ID</p>
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
