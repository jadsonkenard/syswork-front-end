import { useLocation } from "react-router-dom";
import { Button, Label, LoadingOverlay } from "../../components";
import type { Department } from "../../types/Department";
import { useEffect, useState } from "react";
import styles from "./DepartmentDetails.module.css";
import { formatDate } from "../../utils/formatDate";
import { getDepartmentById } from "../../services/DepartmentService";
import { notify } from "../../services/notification";

export default function DepartmentDetail() {
  const [department, setDepartment] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const id = state?.id;

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

  function handleDepartment(id: number) {
    alert("update" + id);
  }

  function handleDelete(id: number) {
    alert("delete" + id);
  }

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
                backgroundColor="var(--info-dark)"
                onClick={() => handleDepartment(item.id)}
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
