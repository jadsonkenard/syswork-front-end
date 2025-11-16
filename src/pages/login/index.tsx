import { Input } from "../../components";

export default function Login() {
  return (
    <div>
      <h1>Página de Login</h1>
      <Input
        iconName="userCheck"
        name="username"
        placeholder="nome de usuário"
      />
    </div>
  );
}
