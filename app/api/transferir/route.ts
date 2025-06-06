import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const novoUsuario = formData.get("novoUsuario") as string;

  if (!id || !novoUsuario) {
    return NextResponse.json(
      { error: "Preencha todos os campos." },
      { status: 400 }
    );
  }

  try {
    const updatedRecord = await prisma.condominio.update({
      where: { id },
      data: { criadorId: novoUsuario },
    });

    return NextResponse.json({
      message: "Cadastro transferido com sucesso!",
      updatedRecord,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao transferir o cadastro." },
      { status: 500 }
    );
  }
}
