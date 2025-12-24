/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Input, LoadingOverlay } from "../../../components";
import type { NewPosition } from "../../../types/Position";
import styles from "./NewPosition.module.css";
import { newPositionStore } from "../../../services/PositionService";
import { notify } from "../../../services/notification";
import { formatSalary } from "../../../utils/formatSalary";
import { useNavigate } from "react-router-dom";

export default function NewPosition() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [form, setForm] = useState<NewPosition>({
    name: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    let finalValue = value;

    if (name === "salary") {
      finalValue = formatSalary(value);
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
    console.log(form.name);
    insertNewPosition();
    setLoading(true);
  }

  async function insertNewPosition() {
    try {
      const response = await newPositionStore(form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({ name: "" });
      setErrors("");
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    setLoading(false);
  }

  const navigate = useNavigate();

  function goBack() {
    navigate("/management");
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
