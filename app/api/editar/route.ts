import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const campo = formData.get("campo") as string;
  const valor = formData.get("valor") as string;

  if (!id || !campo || !valor) {
    return NextResponse.json(
      { error: "Preencha todos os campos." },
      { status: 400 }
    );
  }

  try {
    const updatedRecord = await prisma[campo].update({
      where: { id },
      data: { [campo]: valor },
    });

    return NextResponse.json({
      message: "Cadastro atualizado com sucesso!",
      updatedRecord,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao atualizar o cadastro." },
      { status: 500 }
    );
  }
}
