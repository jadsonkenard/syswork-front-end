import { Card } from "../../components";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Home</h2>
      <Card
        id={1}
        status="in progress"
        title="Conserto de Ar condicionado"
        description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
        requester_user="awdwadwad"
        requester_department="dadwadwadwadw"
        executor_department="cadwadwadwadwad"
        createdAt="06/12/2025, 18:55"
        updatedAt="06/12/2025, 18:55"
        statusColor="#00ff0d"
      />
      <Card
        id={1}
        status="in progress"
        title="Conserto de Ar condicionado"
        description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
        requester_user="awdwadwad"
        requester_department="dadwadwadwadw"
        executor_department="cadwadwadwadwad"
        createdAt="06/12/2025, 18:55"
        updatedAt="06/12/2025, 18:55"
        statusColor="#1f09e6"
      />
    </div>
  );
}

// <Link to="/ticketdetail" state={{ ticketExemple }}>
//   Ver detalhes
// </Link>

// style={{
//   flex: 1,
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
// }}
