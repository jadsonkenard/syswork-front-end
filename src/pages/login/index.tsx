import { useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import styles from "./Login.module.css";
import { useState } from "react";

type LoginFormData = {
  username: string;
  password: string;
};

export default function Login() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  function onSubmit(data: LoginFormData) {
    console.log("Dados enviados:", data);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Login</h2>
        {/* Username */}
        <div className={styles.field}>
          <Input
            iconName="user"
            placeholder="Nome de usuário"
            {...register("username", { required: "O usuário é obrigatório" })}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <Input
            iconName="lock"
            placeholder="Senha"
            {...register("password", { required: "A senha é obrigatória" })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <Button
          title="Entrar"
          onClick={() => setLoading(!loading)}
          isLoading={loading}
          height="55px"
          width="450px"
        />
      </form>
    </div>
  );
}
