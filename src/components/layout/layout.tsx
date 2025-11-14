import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
