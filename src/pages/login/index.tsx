/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Input } from "../../components";
import styles from "./Login.module.css";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<string>("");

  const authService = AuthService();
  const { setUser } = useAuth();
  const navigate = useNavigate();

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
    if (!form.username.trim()) {
      setErrors("Nome de usuário é obrigatório");
      setLoading(false);
      return;
    }

    if (!form.password.trim()) {
      setErrors("Senha é obrigatória");
      setLoading(false);
      return;
    }
    console.log(form.username, form.password);
    handleLogin();
    setLoading(true);
  }

  async function handleLogin() {
    //>>>>>>>>>>>>>>SAIDA PARA API<<<<<<<<<<<<<<<<
    try {
      const user = await authService.login(form.username, form.password);

      setUser(user);
      navigate("/");
    } catch (error: any) {
      setErrors(error.message || "Erro inesperado");
      setLoading(false);
    }
    console.log(form.username, form.password);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        {/* Username */}
        <div className={styles.field}>
          <Input
            name="username"
            iconName="user"
            placeholder="Nome de usuário"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className={styles.field}>
          <Input
            name="password"
            type="password"
            iconName="lock"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <Button
          title="Entrar"
          isLoading={loading}
          height="55px"
          width="450px"
          type="submit"
          onClick={() => console.log("Clicou.")}
          disabled={loading ? true : false}
        />
        <p className={styles.error}>{errors}</p>
      </form>
    </div>
  );
}
