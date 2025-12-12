import { useEffect, useState } from "react";
import { Button, LoadingOverlay } from "../../../components";
import { formatDate } from "../../../utils/formatDate";
import styles from "./AllPositions.module.css";
import type { Position } from "../../../types/Position";
import { notify } from "../../../services/notification";
import { getAllPositions } from "../../../services/PositionService";

export default function AllPositions() {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const response = await getAllPositions(page, limit);
        console.log(response);
        console.log(response.limit);
        setPositions(response.data);
        setLimit(response.limit);
        setTotalPages(response.totalPages);
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
  }, [page, limit]);

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
          {positions.map((item) => (
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
      <div className={styles.buttons}>
        <Button
          title="Anterior"
          isLoading={false}
          disabled={page === 1}
          height="30px"
          width="100px"
          onClick={() => setPage(page - 1)}
        />
        <Button
          title="Próxima"
          isLoading={false}
          disabled={page === totalPages}
          height="30px"
          width="100px"
          onClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
