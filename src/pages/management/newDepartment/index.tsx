/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Input, LoadingOverlay, Select } from "../../../components";
import type { NewDepartment } from "../../../types/Department";
import { newDepartmentStore } from "../../../services/DepartmentService";
import { notify } from "../../../services/notification";
import styles from "./NewDepartment.module.css";
import { getAllPositions } from "../../../services/PositionService";

export default function NewDepartment() {
  const [loading, setLoading] = useState(false);
  const [loadPositions, setLoadPositions] = useState([]);
  const [errors, setErrors] = useState<string>("");
  const [form, setForm] = useState<NewDepartment>({
    name: "",
    position_id: 0,
  });

  useEffect(() => {
    async function loadDepartment() {
      try {
        const response = await getAllPositions(1, 1000);
        console.log(response);
        setLoadPositions(response.data);
      } catch (error) {
        if (typeof error === "string") {
          console.log(error);
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    loadDepartment();
  }, []);

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
      setErrors("Insira o nome do setor.");
      setLoading(false);
      return;
    }
    console.log(form.name);
    insertNewDepartment();
    setLoading(true);
  }

  async function insertNewDepartment() {
    try {
      const response = await newDepartmentStore(form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({ name: "", position_id: 0 });
      setErrors("");
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <h3>Nova setor</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <p className={styles.error}>{errors}</p>
      </form>
    </div>
  );
}
