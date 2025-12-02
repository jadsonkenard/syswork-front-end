import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Home</h2>
      <button onClick={() => navigate("/ticketdetail")}>IR</button>
    </div>
  );
}
