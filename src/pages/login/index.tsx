import { useState } from "react";
import { Button, Input } from "../../components";
import styles from "./Login.module.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  function handleSubmit() {
    alert("Formulario enviado.");
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        {/* Username */}
        <div className={styles.field}>
          <Input iconName="user" placeholder="Nome de usuário" />
        </div>

        {/* Password */}
        <div className={styles.field}>
          <Input iconName="lock" placeholder="Senha" />
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
