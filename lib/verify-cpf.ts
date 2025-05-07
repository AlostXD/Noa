import prisma from "@/lib/prisma";
import { getSessionServer } from "./get-session-server";

export async function verifyCpf() {
  // Verifica se o usuário está autenticado
  const session = await getSessionServer();
  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  // Verifica se o CPF já existe no banco de dados pelo ID do usuário
  const existingUser = await prisma.usuario.findUnique({
    where: {
      id: session.user.id
    },
  });

  if (!existingUser) {
    throw new Error("Usuário não encontrado no banco de dados");
  }
  // Verifica se o CPF já está cadastrado
  const existingCpf = await prisma.usuario.findUnique({
    where: { cpf: existingUser.cpf },
  });
  if (!existingCpf) {
    throw new Error("CPF não encontrado no banco de dados");
  }
  // Se o CPF já estiver cadastrado, retorna o CPF existente

  let cpf = existingUser?.cpf;

  console.log("CPF encontrado:", cpf);
  return cpf;
}
export default verifyCpf;