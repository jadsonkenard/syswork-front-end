import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTickets } from "../../services/ReportService";
import { useAuth } from "../../hooks/useAuth";

type ReportItem = {
  id: number;
  title: string;
  description: string;
  status: string;
  requester_department_id: number;
  executor_department_id: number;
  requester_user_id: number;
};

export function ReportDetails() {
  const { accessToken } = useAuth();
  const { mode } = useParams();
  const [data, setData] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!accessToken) return;
      if (!mode) {
        return <div>Relatório inválido</div>;
      }

      setLoading(true);
      try {
        const response = await getTickets(accessToken, mode);
        console.log(response);
        setData(Array.isArray(response) ? response : [response]);
      } catch (error) {
        if (typeof error === "string") {
          console.log(error);
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      }
      setLoading(false);
    }
    load();
  }, [accessToken, mode]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Resultado</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>title</th>
            <th>Descrição</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
