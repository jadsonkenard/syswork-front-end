/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { Button, Input, Label, Select } from "../../../components";
import styles from "./UserUpdate.module.css";
import { useEffect, useState } from "react";
import type {
  UpdateUser,
  User,
  UserRole,
  UserStatus,
} from "../../../types/User";
import { notify } from "../../../services/notification";
import { getUserById, updateUser } from "../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../../../services/DepartmentService";
import { getAllPositions } from "../../../services/PositionService";

export default function UserUpdate() {
  const [user, setUser] = useState<User[]>([]);
  const [loadDepartment, setLoadDepartment] = useState([]);
  const [loadPosition, setLoadDPosition] = useState([]);
  const [form, setForm] = useState<UpdateUser>({
    full_name: "",
    phone: "",
    email: "",
    role: "",
    position_id: 0,
    department_id: 0,
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await getUserById(id);
        setForm({
          full_name: response.full_name ?? "",
          phone: response.phone ?? "",
          email: response.email ?? "",
          role: response.role ?? "",
          department_id: response.department_id ?? 0,
          position_id: response.position_id ?? 0,
          status: response.status ?? "",
        });

        const departments = await getAllDepartments();
        setLoadDepartment(departments);

        const positions = await getAllPositions(1, 100);
        setLoadDPosition(positions.data);

        console.log(response);
        setUser([response]);
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
    load();
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
    if (!form.full_name.trim()) {
      setErrors("O nome completo não pode ser vazio.");
      setLoading(false);
      return;
    }
    //DEMAIS VALIDAÇÕES

    insertUpdateUser();
    console.log(form.full_name);
  }

  async function insertUpdateUser() {
    try {
      setLoading(true);
      const response = await updateUser(id, form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({
        full_name: "",
        phone: "",
        email: "",
        role: "",
        position_id: 0,
        department_id: 0,
        status: "",
      });
      setErrors("");
      setLoading(false);
      navigate("/user/listusers");
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    setLoading(false);
  }

  const statusOptions: { label: string; value: UserStatus }[] = [
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
  ];

  const roleOptions: { label: string; value: UserRole }[] = [
    { label: "Usuário", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  function goBack() {
    navigate("/user/listusers");
  }

  return (
    <div className={styles.container}>
      <h3>Atualizar usuário</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        {(user ?? []).map((item) => (
          <>
            <div className={styles.field}>
              <Label iconName="id" title="ID" value={item.id} />
            </div>
            <div>
              <Label
                iconName="userStar"
                title="Nome de usuário"
                value={item.username}
              />
            </div>
            <div>
              <Label
                iconName="number"
                title="CPF"
                value={item.cpf}
              />
            </div>
          </>
        ))}

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
            name="phone"
            iconName="phoneCall"
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
            iconName="mail"
            placeholder="Email"
            value={form.email}
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
