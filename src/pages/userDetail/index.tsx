import { useLocation } from "react-router-dom";

export default function UserDatail() {
  const { state } = useLocation();
  const id = state?.id;
  return (
    <div>
      <h3>Detalhes do usuário: {id}</h3>
    </div>
  );
}
