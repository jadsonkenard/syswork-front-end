import styles from "./Header.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles["box-content"]}>
        <DynamicIcon
          iconName="userCheck"
          color="var(--primary-dark)"
          size={22}
        />
        <h3 className={styles.username}>{user ? user.username : ""}</h3>
        <button className={styles["button-logout"]} onClick={logout}>
          sair
        </button>
      </div>
    </div>
  );
}
