import { useState } from "react";
import { Button, Input } from "../../components";
import styles from "./Login.module.css";

// type UserLoginData = {
//   username: string;
//   password: string;
// };

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Teste");
    console.log(username, password);
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        {/* Username */}
        <div className={styles.field}>
          <Input
            iconName="user"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className={styles.field}>
          <Input
            iconName="lock"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          title="Entrar"
          onClick={() => setLoading(!loading)}
          isLoading={loading}
          height="55px"
          width="450px"
          type="submit"
        />
      </form>
    </div>
  );
}
