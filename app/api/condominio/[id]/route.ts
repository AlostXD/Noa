import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/condominio/").pop(); // Extrai o ID da URL

  if (!id) {
    return NextResponse.json(
      { error: "ID do condomínio não fornecido." },
      { status: 400 }
    );
  }

  try {
    const condominio = await prisma.condominio.findUnique({
      where: { id },
      include: {
        Admin: {
          include: {
            usuario: true, // Inclui os dados do usuário relacionado
          },
        },
        unidades: true,
        feedbacks: true,
        manutencoes: true,
        pagamentos: true,
      },
    });

    if (!condominio) {
      return NextResponse.json(
        { error: "Condomínio não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(condominio);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar os detalhes do condomínio." },
      { status: 500 }
    );
  }
}
