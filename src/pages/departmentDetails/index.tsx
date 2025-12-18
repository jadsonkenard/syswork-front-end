import { useLocation, useNavigate } from "react-router-dom";
import { Button, Label, LoadingOverlay, ConfirmModal } from "../../components";
import type { Department } from "../../types/Department";
import { useEffect, useState } from "react";
import styles from "./DepartmentDetails.module.css";
import { formatDate } from "../../utils/formatDate";
import { getDepartmentById } from "../../services/DepartmentService";
import { notify } from "../../services/notification";
import { deleteDepartmentById } from "../../services/DepartmentService";

export default function DepartmentDetail() {
  const [department, setDepartment] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.id;

  async function handleDelete(id: number) {
    setLoading(true);
    try {
      await deleteDepartmentById(id);
      setLoading(false);
      notify("success", "Função deletada com sucesso!.");
      navigate("/department/all");
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

  function handleDepartment(id: number) {
    navigate("/department/departmentupdate", {
      state: { id },
    });
  }

  useEffect(() => {
    async function getDepartmentId() {
      try {
        setLoading(true);
        const response = await getDepartmentById(id);
        console.log(response);
        setDepartment([response]);
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
    getDepartmentId();
  }, [id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes do setor</h2>
      <LoadingOverlay isLoading={loading} />
      <nav className={styles.nav}>
        {(department ?? []).map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.buttons}>
              <Button
                title="Atualizar"
                isLoading={false}
                backgroundColor="var(--neutral-600)"
                onClick={() => handleDepartment(item.id)}
              />
              <Button
                title="Deletar"
                isLoading={false}
                backgroundColor="var(--error-dark)"
                onClick={() => setOpenConfirm(true)}
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
