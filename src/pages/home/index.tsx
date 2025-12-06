import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  const ticketExemple = 102;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Home</h2>
      <Link to="/ticketdetail" state={{ ticketExemple }}>
        Ver detalhes
      </Link>
    </div>
  );
}
