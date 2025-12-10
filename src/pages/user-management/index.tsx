import styles from "./User-management.module.css";
import { getAllDepartments } from "../../services/DepartmentService";
import { useEffect } from "react";

export default function UserManagement() {
  useEffect(() => {
    async function load() {
      try {
        const response = await getAllDepartments();
        console.log(response);
      } catch (error) {
        if (typeof error === "string") {
          console.log(error);
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    load();
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciamento de usuários</h2>
      <button>Buscar</button>
    </div>
  );
}
