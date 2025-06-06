import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const nome = formData.get("name") as string;
  const endereco = formData.get("endereco") as string;

  if (!nome || !endereco) {
    return NextResponse.json(
      { error: "Preencha todos os campos." },
      { status: 400 }
    );
  }

  try {
    const user = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: request.headers,
    });

    if (!user?.user || !user?.user.id) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    // Check if the Usuario exists
    const usuarioExists = await prisma.usuario.findUnique({
      where: { id: user.user.id },
    });

    if (!usuarioExists) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Create the Condominio
    const condominio = await prisma.condominio.create({
      data: {
        nome: nome,
        endereco: endereco,
        criadorId: usuarioExists.id,
      },
    });

    // Create the Admin record
    await prisma.admin.create({
      data: {
        usuario: {
          connect: { id: usuarioExists.id },
        },
        condominio: {
          connect: { id: condominio.id },
        },
      },
    });

    return NextResponse.json({
      message: "Condomínio e administrador criados com sucesso!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao atualizar os dados." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: request.headers,
    });

    if (!user?.user || !user?.user.id) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const condominios = await prisma.condominio.findMany({
      where: { Usuario: { id: user.user.id } },
      include: { Usuario: true },
    });

    return NextResponse.json(condominios);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar os dados." },
      { status: 500 }
    );
  }
}
