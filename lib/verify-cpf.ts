import prisma from "@/lib/prisma";

export async function verifyCpf(cpf: string) {
  // Verifica se o CPF já existe no banco de dados
  const existingUser = await prisma.usuario.findUnique({
    where: { cpf },
  });

  return existingUser;
}