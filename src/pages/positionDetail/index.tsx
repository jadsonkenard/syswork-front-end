import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PositionDetail.module.css";
import { Button, Label, LoadingOverlay, ConfirmModal } from "../../components";
import { useEffect, useState } from "react";
import {
  getPositionById,
  deletePositionById,
} from "../../services/PositionService";
import { notify } from "../../services/notification";
import type { Position } from "../../types/Position";
import { formatDate } from "../../utils/formatDate";

export default function PositionDetail() {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<Position[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);

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

  function handlePosition(id: number) {
    navigate("/position/positionupdate", {
      state: { id },
    });
  }

  useEffect(() => {
    async function getPositionId() {
      try {
        setLoading(true);
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

  function goBack() {
    navigate("/positions/all");
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
                backgroundColor="var(--neutral-600)"
                onClick={() => handlePosition(item.id)}
              />
              <Button
                title="Deletar"
                isLoading={false}
                backgroundColor="var(--error-dark)"
                onClick={() => setOpenConfirm(true)}
              />
              <Button
                title="Voltar"
                isLoading={false}
                backgroundColor="var(--neutral-400)"
                onClick={goBack}
              />
            </div>
            <Label iconName="id" title="ID" value={item.id} />
            <Label iconName="info" title="Nome" value={item.name} />
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
            <ConfirmModal
              open={openConfirm}
              title="Excluir função"
              description="Esta ação não poderá ser desfeita. Deseja continuar?"
              confirmText="Excluir"
              onConfirm={() => handleDelete(item.id)}
              onCancel={() => setOpenConfirm(false)}
              loading={loading}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
