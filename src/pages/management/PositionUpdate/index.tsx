/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PositionUpdate.module.css";
import { useEffect, useState } from "react";
import { getPositionById } from "../../../services/PositionService";
import { notify } from "../../../services/notification";
import { Button, Input, Label } from "../../../components";
import { formatSalary } from "../../../utils/formatSalary";
import type { UpdatePosition } from "../../../types/Position";
import { newPositionUpdate } from "../../../services/PositionService";

export default function PositionUpdate() {
  const [form, setForm] = useState<UpdatePosition>({
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function getPositionId() {
      try {
        const response = await getPositionById(id);
        console.log(response);
        setForm({
          name: response.name ?? ""
        });
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

    getPositionId();
  }, [id]);

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
    insertPositionUpdate();
    console.log(form.name);
  }

  async function insertPositionUpdate() {
    try {
      setLoading(true);
      const response = await newPositionUpdate(id, form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({ name: ""});
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
    navigate("/positions/all");
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Atualizar função</h3>
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
