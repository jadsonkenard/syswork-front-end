/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById, newPassword } from "../../../services/UserService";
import { notify } from "../../../services/notification";
import type { User, UpdatePass } from "../../../types/User";
import styles from "./UpdatePassword.module.css";
import { Button, Input, Label } from "../../../components";

export default function UpdatePassword() {
  const [user, setUser] = useState<User[]>([]);
  const [form, setForm] = useState<UpdatePass>({
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await getUserById(id);
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
    if (!form.password.trim()) {
      setErrors("O senha não pode ser vazia.");
      setLoading(false);
      return;
    }

    insertNewPassword();
    console.log(form.password);
  }

  async function insertNewPassword() {
    try {
      setLoading(true);
      const response = await newPassword(id, form);
      console.log(response);
      notify("success", "Sucesso.");
      setForm({ password: "" });
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
    navigate("/user/listusers");
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Alterar senha</h3>
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
          </>
        ))}

        <div className={styles.field}>
          <Input
            name="password"
            iconName="lock"
            placeholder="Nova senha"
            type="password"
            value={form.password}
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
