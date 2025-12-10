/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Input, Label, LoadingOverlay } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import styles from "./NewTicket.module.css";
import type { NewTicketForm } from "../../types/newTicket";
import { NewTicketStore } from "../../services/TicketService";
import { notify } from "../../services/notification";
import { Select } from "../../components";

const userTypes = [
  { value: "user", label: "Usuário" },
  { value: "admin", label: "Administrador" },
];

export default function NewTicket() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [form, setForm] = useState<NewTicketForm>({
    title: "",
    description: "",
    executor_department_id: 0,
  });
  const { user } = useAuth();

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
    if (!form.title.trim()) {
      setErrors("Título do chamado é obrigatório");
      setLoading(false);
      return;
    }
    if (!form.description.trim()) {
      setErrors("Descrição do chamado é obrigatório");
      setLoading(false);
      return;
    }
    if (!form.executor_department_id) {
      setErrors("Informe o setor executante");
      setLoading(false);
      return;
    }

    console.log(form.title, form.description, form.executor_department_id);
    handleLogin();
    setLoading(true);
  }

  async function handleLogin() {
    try {
      const response = await NewTicketStore(form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({ title: "", description: "", executor_department_id: 0 });
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={loading} />
      <h3>Novo chamado</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Label
          iconName="userCheck"
          title="Usuário solicitante"
          value={user?.username as string}
          width="600px"
          height="55px"
        />
        <div className={styles.field}>
          <Input
            name="title"
            iconName="info"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <div className={styles.field}>
          <Input
            name="description"
            iconName="question"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <div className={styles.field}>
          <Input
            name="executor_department_id"
            iconName="department2"
            placeholder="Descrição"
            value={form.executor_department_id}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <Select title="Setor executante" width="600px" height="55px" options={userTypes}/>

        <Button
          title="Entrar"
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
