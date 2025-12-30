import { useLocation } from "react-router-dom";

export default function UserUpdate() {
  const { state } = useLocation();

  const id = state?.id;
  return (
    <div>
      <h3>Atualizar usuário: {id}</h3>
    </div>
  );
}
