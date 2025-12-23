/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTicketById } from "../../services/ReportService";
import { notify } from "../../services/notification";
import { Button, Input, Label, LoadingOverlay, Select } from "../../components";
import styles from "./TicketUpdate.module.css";
import type { TicketUpdate } from "../../types/ticket";
import { getAllDepartments } from "../../services/DepartmentService";
import { newTicketUpdate } from "../../services/TicketService";

export default function TicketUpdate() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [loadDepartment, setLoadDepartment] = useState([]);

  const [form, setForm] = useState<TicketUpdate>({
    title: "",
    description: "",
    status: "",
    requester_department_id: 0,
    executor_department_id: 0,
  });

  const id = state?.id;

  useEffect(() => {
    async function getTicketId() {
      try {
        setLoading(true);
        const ticket = await getTicketById(id);
        console.log(ticket);
        setForm({
          title: ticket.title ?? "",
          description: ticket.description ?? "",
          status: ticket.status ?? "open",
          requester_department_id: ticket.requester_department_id ?? "",
          executor_department_id: ticket.executor_department_id ?? "",
        });

        const departments = await getAllDepartments();
        console.log(departments);
        setLoadDepartment(departments);

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

    getTicketId();
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
    // if (!form.name.trim()) {
    //   setErrors("O nome do setor não poder ser vazio.");
    //   setLoading(false);
    //   return;
    // }
    insertTicketUpdate();
    console.log(form.title, form.description);
  }

  async function insertTicketUpdate() {
    try {
      setLoading(true);
      const response = await newTicketUpdate(id, form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({
        title: "",
        description: "",
        status: "open",
        requester_department_id: 0,
        executor_department_id: 0,
      });
      setErrors("");
      setLoading(false);
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <h3>Editar chamado: {id}</h3>
      <LoadingOverlay isLoading={loading} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <Label iconName="id" title="ID" value={id} />
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
            iconName="info"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <Select
          name="status"
          value={form.status}
          title="Status"
          width="600px"
          height="55px"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
          options={[
            { label: "Aberto", value: "open" },
            { label: "Em andamento", value: "in progress" },
            { label: "Concluído", value: "done" },
          ]}
        />
        <Select
          name="requester_department_id"
          value={form.requester_department_id}
          title="Setor solicitante"
          width="600px"
          height="55px"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              requester_department_id: Number(e.target.value),
            }))
          }
          options={loadDepartment.map((d: any) => ({
            value: d.id,
            label: d.name,
          }))}
        />

        <Select
          name="executor_department_id"
          value={form.executor_department_id}
          title="Setor executante"
          width="600px"
          height="55px"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              executor_department_id: Number(e.target.value),
            }))
          }
          options={loadDepartment.map((d: any) => ({
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
