/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Label, Select } from "../../../components";
import type { UpdateDepartment } from "../../../types/Department";
import { useEffect, useState } from "react";
import {
  getDepartmentById,
  newDepartmentUpdate,
} from "../../../services/DepartmentService";
import { notify } from "../../../services/notification";
import styles from "./DepartmentUpdate.module.css";
import { getAllPositions } from "../../../services/PositionService";

export default function DepartmentUpdate() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [loadPositions, setLoadPositions] = useState([]);
  const [form, setForm] = useState<UpdateDepartment>({
    name: "",
    position_id: 1,
  });

  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function loadData() {
      try {
        const department = await getDepartmentById(id);
        setForm({
          name: department.name ?? "",
          position_id: department.position_id ?? "",
        });

        const positions = await getAllPositions(1, 1000);
        setLoadPositions(positions.data);

        setLoading(false);
        notify("success", "Sucesso.");
      } catch (error) {
        setLoading(false);
        if (typeof error === "string") {
          notify("warning", error);
        } else if (error instanceof Error) {
          notify("warning", error.message);
        }
      }
    }

    loadData();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!form.name.trim()) {
      setErrors("O nome do setor não poder ser vazio.");
      setLoading(false);
      return;
    }
    insertDepartmentUpdate();
    console.log(form.name, form.position_id);
  }

  async function insertDepartmentUpdate() {
    try {
      setLoading(true);
      const response = await newDepartmentUpdate(id, form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({ name: "", position_id: 0 });
      setErrors("");
      setLoading(false);
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    setLoading(false);
  }

  const navigate = useNavigate();

  function goBack() {
    navigate("/department/all");
  }

  return (
    <div className={styles.container}>
      <h3>Atualizar setor</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Label iconName="id" title="ID" value={id} />
        <div className={styles.field}>
          <Input
            name="name"
            iconName="info"
            placeholder="nome"
            value={form.name}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <Select
          name="position_id"
          value={form.position_id}
          title="Função"
          width="600px"
          height="55px"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              position_id: Number(e.target.value),
            }))
          }
          options={loadPositions.map((d: any) => ({
            value: d.id,
            label: d.name,
          }))}
        />

        <Button
          title="Salvar"
          isLoading={loading}
          height="55px"
          width="600px"
          type="submit"
          disabled={loading ? true : false}
        />
        <Button
          title="Cancelar"
          isLoading={loading}
          height="55px"
          width="600px"
          onClick={goBack}
          disabled={loading ? true : false}
          backgroundColor="var(--neutral-400)"
        />
        <p className={styles.error}>{errors}</p>
      </form>
    </div>
  );
}
