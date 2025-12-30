import { useLocation } from "react-router-dom";

export default function UpdatePassword() {
  const { state } = useLocation();

  const id = state?.id;
  return (
    <div>
      <h3>Alterar senha: {id}</h3>
    </div>
  );
}
