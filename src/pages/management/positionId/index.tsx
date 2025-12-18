/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../../../components";
import { formatDate } from "../../../utils/formatDate";
import styles from "./PositonId.module.css";
import type { Position } from "../../../types/Position";
import { notify } from "../../../services/notification";
import { getPositionById } from "../../../services/PositionService";
import { formatBRL } from "../../../utils/formatBRL";

export default function PositionId() {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<Position[]>([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.id;

  function handlePosition(id: number) {
    navigate("/position/positiondetail", {
      state: { id },
    });
  }

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
          navigate("/management");
        } else if (error instanceof Error) {
          notify("warning", error.message);
          setLoading(false);
          console.log(error.message);
          navigate("/management");
        }
      }
    }
    load();
  }, [id]);

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <h3>Função por ID</h3>
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
            <tr key={item.id} onClick={() => handlePosition(item.id)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{formatBRL(item.salary)}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{formatDate(item.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
