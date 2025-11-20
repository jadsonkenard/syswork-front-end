import { AuthService } from "./AuthService";

export async function testAuth() {
  console.log("=== INICIANDO TESTE DE AUTENTICAÇÃO ===");

  try {
    // 1. LOGIN
    console.log("→ Testando login...");
    const loginResult = await AuthService.login({
      username: "jadsonkps",
      password: "jadsonpaim",
    });
    console.log("Login OK:", loginResult);

    // 2. GET ME
    console.log("→ Testando /me...");
    const me = await AuthService.getMe();
    console.log("Usuário autenticado:", me);

    // 3. REFRESH TOKEN
    console.log("→ Testando refresh...");
    const refreshed = await AuthService.refreshToken();
    console.log("Novo token:", refreshed);

    console.log("=== TESTE FINALIZADO COM SUCESSO ===");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("❌ Erro durante o teste:");
    console.error("Status:", err.status);
    console.error("Mensagem:", err.message);
    console.error("Detalhes:", err.details);
  }
}
