import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PositionDetail.module.css";
import { Button, Label, LoadingOverlay } from "../../components";
import { useEffect, useState } from "react";
import {
  getPositionById,
  deletePositionById,
} from "../../services/PositionService";
import { notify } from "../../services/notification";
import type { Position } from "../../types/Position";
import { formatDate } from "../../utils/formatDate";
import { formatBRL } from "../../utils/formatBRL";

export default function PositionDetail() {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<Position[]>([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.id;

  async function handleDelete(id: number) {
    setLoading(true);
    try {
      await deletePositionById(id);
      setLoading(false);
      notify("success", "Função deletada com sucesso!.");
      navigate("/positions/all");
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

  useEffect(() => {
    async function getPositionId() {
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
    getPositionId();
  }, [id]);

  function handleTicket(id: number) {
    navigate("/position/positionupdate", {
      state: { id },
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes função</h2>
      <LoadingOverlay isLoading={loading} />
      <nav className={styles.nav}>
        {(position ?? []).map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.buttons}>
              <Button
                title="Atualizar"
                isLoading={false}
                backgroundColor="var(--info-dark)"
                onClick={() => handleTicket(item.id)}
              />
              <Button
                title="Deletar"
                isLoading={false}
                backgroundColor="var(--error-dark)"
                onClick={() => handleDelete(item.id)}
              />
            </div>
            <Label iconName="id" title="ID" value={item.id} />
            <Label iconName="info" title="Nome" value={item.name} />
            <Label
              iconName="money"
              title="Salário"
              value={formatBRL(item.salary)}
            />
            <Label
              iconName="time1"
              title="Criado em"
              value={formatDate(item.createdAt)}
            />
            <Label
              iconName="time2"
              title="Atualizado em"
              value={formatDate(item.updatedAt)}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
