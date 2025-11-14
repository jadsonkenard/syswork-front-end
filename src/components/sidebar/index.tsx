import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>LOGO</div>
        <div className={styles["box-new-ticket"]}>
          <button>Novo chamado</button>
        </div>
        <p>Opção 1</p>
        <p>Opção 1</p>
        <p>Opção 1</p>
        <p>Opção 1</p>
      </aside>
    </div>
  );
}
