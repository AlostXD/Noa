import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const cpf = formData.get("cpf") as string;
  const endereco = formData.get("endereco") as string;
  const date = formData.get("date") as string;
  const cidade = formData.get("cidade") as string;

  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: request.headers,
  });

  if (!session?.user) {
    throw new Error("User session is invalid or missing.");
  }

  try {
    await prisma.usuario.upsert({
      where: {
        id: session.user.id, // Usando o ID do usuário autenticado
      },
      update: {
        nome: session.user.name,
        email: session.user.email,
        cidade,
        cpf,
        endereco,
        date,
      },
      create: {
        nome: session.user.name,
        email: session.user.email,
        cidade,
        cpf,
        endereco,
        date,
        user: {
          connect: { id: session.user.id },
        },
      },
    });
    return NextResponse.json({ message: "Dados registrados com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar os dados." },
      { status: 500 }
    );
  }
}
