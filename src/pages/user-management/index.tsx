import styles from "./User-management.module.css";

export default function UserManagement() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciamento de usuários</h2>
      <button>Buscar</button>
    </div>
  );
}