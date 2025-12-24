import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import styles from "./ListUsers.module.css";
import { getAllUsers } from "../../../services/UserService";
import { notify } from "../../../services/notification";
import type { User } from "../../../types/User";
import { Button, LoadingOverlay } from "../../../components";

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const response = await getAllUsers(page, limit);
        console.log(response);
        setUsers(response.data);
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
      <h3>Lista de usuários</h3>
      <table
        border={1}
        cellPadding="8"
        cellSpacing="0"
        className={styles["positions-table"]}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome completo</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Nome de usuário</th>
            <th>Tipo de usuário</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Setor</th>
            <th>Função</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.full_name}</td>
              <td>{item.cpf}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{formatDate(item.updatedAt)}</td>
              <td>{item.department?.name}</td>
              <td>{item.position?.name}</td>
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
