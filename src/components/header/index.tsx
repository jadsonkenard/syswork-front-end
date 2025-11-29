import { useState } from "react";
import styles from "./Header.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const [userLogged, setUserLogged] = useState("");

  const {logout} = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles["box-content"]}>
        <DynamicIcon
          iconName="userCheck"
          color="var(--primary-dark)"
          size={22}
        />
        <h3 className={styles.username}>
          {userLogged ? userLogged : "Username"}
        </h3>
        <h3 className={styles.username} onClick={logout}>
          sair
        </h3>
      </div>
    </div>
  );
}
