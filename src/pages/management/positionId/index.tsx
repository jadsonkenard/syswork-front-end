import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingOverlay } from "../../../components";
import { formatDate } from "../../../utils/formatDate";
import styles from "./PositonId.module.css";
import type { Position } from "../../../types/Position";
import { notify } from "../../../services/notification";
import { getPositionById } from "../../../services/PositionService";

export default function PositionId() {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<Position[]>([]);
  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function load() {
      try {
        const response = await getPositionById(id);
        console.log(response);
        setPosition([response]);
        setLoading(false);
        notify("success", "Sucesso.");
      } catch (error) {
        if (typeof error === "string") {
          notify("warning", error);
          setLoading(false);
          console.log(error);
        } else if (error instanceof Error) {
          notify("warning", error.message);
          setLoading(false);
          console.log(error.message);
        }
      }
    }
    load();
  }, [id]);

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <h3>Todos os chamados</h3>
      <table
        border={1}
        cellPadding="8"
        cellSpacing="0"
        className={styles["positions-table"]}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Salário</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
          </tr>
        </thead>

        <tbody>
          {position.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.salary}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{formatDate(item.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
