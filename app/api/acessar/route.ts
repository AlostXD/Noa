import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  if (!id) {
    return NextResponse.json(
      { error: "Preencha o ID do cadastro." },
      { status: 400 }
    );
  }

  try {
    const record = await prisma.condominio.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json(
        { error: "Cadastro não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao acessar o cadastro." },
      { status: 500 }
    );
  }
}
