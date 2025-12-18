import { useLocation } from "react-router-dom";

export default function DepartmentUpdate() {
  const { state } = useLocation();
  const id = state?.id;
  return (
    <div>
      <h3>Atualizar setor: {id}</h3>
    </div>
  );
}
