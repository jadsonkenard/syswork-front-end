import { useState } from "react";
import styles from "./Header.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

export default function Header() {
  const [userLogged, setUserLogged] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles["box-content"]}>
        <DynamicIcon iconName="userCheck" color="var(--primary-dark)" size={22} />
        <h3 className={styles.username}>{userLogged ? userLogged : "Login"}</h3>
      </div>
    </div>
  );
}
