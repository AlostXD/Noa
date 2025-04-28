import { authClient } from "./auth-client";

export async function signOut() {
  try {
    await authClient.signOut();
    console.log("Logout bem-sucedido");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}