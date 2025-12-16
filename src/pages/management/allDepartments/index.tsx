import { useEffect, useState } from "react";
import { LoadingOverlay } from "../../../components";
import styles from "./allDepartments.module.css";
import { formatDate } from "../../../utils/formatDate";
import { getAllDepartments } from "../../../services/DepartmentService";
import type { Department } from "../../../types/Department";
import { notify } from "../../../services/notification";

export default function AllDepartments() {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const response = await getAllDepartments();
        console.log(response);
        setDepartments(response);
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
  }, []);
  return (
    <div className={styles.container}>
      <h3>Todos os setores</h3>
      <LoadingOverlay isLoading={loading} />
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
            <th>Função associada</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((item) => (
            <tr key={item.id} onClick={() => {}}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.position?.name}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{formatDate(item.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
