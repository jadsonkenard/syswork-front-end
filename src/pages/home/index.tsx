import { useState } from "react";
import { ButtonNewTicket } from "../../components";

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1>Home</h1>
      <ButtonNewTicket
        title="Novo chamado"
        onClick={() => setLoading(!loading)}
        isLoading={loading}
      />
    </div>
  );
}
