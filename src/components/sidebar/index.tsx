import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>LOGO</div>
      </aside>
    </div>
  );
}
