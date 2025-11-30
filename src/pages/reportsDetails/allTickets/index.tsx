import { useEffect, useState } from "react";
import type { ReportItem } from "../../../types/ReportProps";
import { getTicketsAll } from "../../../services/ReportService";

export default function AllTickets() {
  const [data, setData] = useState<ReportItem[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const response = await getTicketsAll();
        console.log(response);
        setData(response.data);
        // setData(Array.isArray(response) ? response : [response]);
      } catch (error) {
        if (typeof error === "string") {
          console.log(error);
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    load();
  }, []);
  return (
    <div>
      <h3>Todos os chamados</h3>
      <table border={1} cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Requester User ID</th>
            <th>Requester Department ID</th>
            <th>Executor Department ID</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td>{item.requester_user_id}</td>
              <td>{item.requester_department_id}</td>
              <td>{item.executor_department_id}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
