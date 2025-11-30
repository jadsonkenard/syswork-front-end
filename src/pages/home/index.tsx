import { useState } from "react";
import { LoadingOverlay } from "../../components";


export default function Home() {
  const [loading, setLoading] = useState(false)

  function handleLoading(){
    setLoading(true)
  }
  return (
    <div>
      <h1>Home</h1>
      <LoadingOverlay isLoading={loading} />
      <button onClick={handleLoading}>Abrir</button>
    </div>
  );
}
