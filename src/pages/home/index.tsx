import { ButtonNewTicket } from "../../components";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ButtonNewTicket
        title="Novo chamado"
        onClick={() => console.log("Ativo")}
      />
    </div>
  );
}
