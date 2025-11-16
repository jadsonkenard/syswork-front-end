import { useForm } from "react-hook-form";
import { Input } from "../../components";
import styles from "./Login.module.css";

type LoginFormData = {
  username: string;
  password: string;
};

export default function Login() {
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
            iconName="User"
            placeholder="Digite seu usuário"
            {...register("username", { required: "O usuário é obrigatório" })}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <Input
            iconName="Lock"
            placeholder="Digite sua senha"
            {...register("password", { required: "A senha é obrigatória" })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        {/* <button type="submit" className={styles.button}>
          Entrar
        </button> */}
      </form>
    </div>
  );
}
