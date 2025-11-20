import { testAuth } from "../../services/AuthTest";

export default function Notfound() {
  return (
    <div>
      <h3>syswork diz:</h3>
      <h1>Error. 404 NotFound. Página não encontrada.</h1>
      <button onClick={testAuth}>Testar Auth</button>
    </div>
  );
}
