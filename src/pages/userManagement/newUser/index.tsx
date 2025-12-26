/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, LoadingOverlay, Select } from "../../../components";
import { useEffect, useState } from "react";
import styles from "./NewUser.module.css";
import { notify } from "../../../services/notification";
import { useNavigate } from "react-router-dom";
import { newUserStore } from "../../../services/UserService";
import type { NewUser, UserStatus, UserRole } from "../../../types/User";
import { getAllDepartments } from "../../../services/DepartmentService";
import { getAllPositions } from "../../../services/PositionService";

export default function NewUser() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [loadDepartment, setLoadDepartment] = useState([]);
  const [loadPosition, setLoadDPosition] = useState([]);
  const [form, setForm] = useState<NewUser>({
    full_name: "",
    cpf: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    role: "user",
    position_id: 0,
    department_id: 0,
    status: "active",
  });

  const navigate = useNavigate();

  const statusOptions: { label: string; value: UserStatus }[] = [
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
  ];

  const roleOptions: { label: string; value: UserRole }[] = [
    { label: "Usuário", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const departments = await getAllDepartments();
        setLoadDepartment(departments);

        const positions = await getAllPositions(1, 100);
        setLoadDPosition(positions.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);

        if (typeof error === "string") {
          notify("warning", error);
        } else if (error instanceof Error) {
          notify("warning", error.message);
        }
      }
    }

    load();
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

    insertNewUser();
    console.log("");
  }

  async function insertNewUser() {
    try {
      setLoading(true);
      const response = await newUserStore(form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({
        full_name: "",
        cpf: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        role: "user",
        position_id: 0,
        department_id: 0,
        status: "active",
      });
      setErrors("");
      setLoading(false);
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    setLoading(false);
  }

  function goBack() {
    navigate("/user-management");
  }

  return (
    <div className={styles.container}>
      <h3>Novo usuário</h3>
      <LoadingOverlay isLoading={loading} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <Input
            name="full_name"
            iconName="info"
            placeholder="Nome completo"
            value={form.full_name}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <div className={styles.field}>
          <Input
            name="cpf"
            iconName="info"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <div className={styles.field}>
          <Input
            name="phone"
            iconName="info"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <div className={styles.field}>
          <Input
            name="email"
            iconName="info"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <div className={styles.field}>
          <Input
            name="username"
            iconName="info"
            placeholder="Nome de usuário"
            value={form.username}
            onChange={handleChange}
            width="600px"
            height="55px"
          />
        </div>
        <div className={styles.field}>
          <Input
            name="password"
            iconName="info"
            placeholder="Senha"
            value={form.password}
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
              status: e.target.value as UserStatus,
            }))
          }
          options={statusOptions}
        />
        <Select
          name="role"
          value={form.role}
          title="Tipo"
          width="600px"
          height="55px"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              role: e.target.value as UserRole,
            }))
          }
          options={roleOptions}
        />
        <Select
          name="department"
          value={form.department_id}
          title="Setor"
          width="600px"
          height="55px"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              department_id: Number(e.target.value),
            }))
          }
          options={loadDepartment.map((d: any) => ({
            value: d.id,
            label: d.name,
          }))}
        />
        <Select
          name="position"
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
          options={loadPosition.map((d: any) => ({
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
