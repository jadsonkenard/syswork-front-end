/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Input, LoadingOverlay } from "../../../components";
import type { NewPosition } from "../../../types/Position";
import styles from "./NewPosition.module.css";
import { newPositionStore } from "../../../services/PositionService";
import { notify } from "../../../services/notification";
import { formatSalary } from "../../../utils/formatSalary";

export default function NewPosition() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [form, setForm] = useState<NewPosition>({
    name: "",
    salary: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    let finalValue = value;

    if (name === "salary") {
      finalValue = formatSalary(value)
    }

    setForm((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    setErrors("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!form.name.trim()) {
      setErrors("Insira o nome da função");
      setLoading(false);
      return;
    }
    if (!form.salary.trim()) {
      setErrors("Informe o salário");
      setLoading(false);
      return;
    }

    console.log(form.name, form.salary);
    InsertNewPosition();
    setLoading(true);
  }

  async function InsertNewPosition() {
    try {
      const response = await newPositionStore(form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({ name: "", salary: "" });
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
      <h3>Nova função</h3>
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
        <div className={styles.field}>
          <Input
            name="salary"
            iconName="info"
            placeholder="Salário"
            value={form.salary}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
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
