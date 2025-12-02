import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function TicketsByIdUser() {
  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    if (id) {
      console.log("ID recebido:", id);
      // Chame sua API aqui
      // fetchRelatorio(id);
    }
  }, [id]);

  return (
    <div>
      <h3>Tickets por ID de usuário {id}</h3>
    </div>
  );
}
