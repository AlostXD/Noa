import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const adminEmail = formData.get("adminEmail") as string;

  if (!id) {
    return NextResponse.json(
      { error: "ID do condomínio não fornecido." },
      { status: 400 }
    );
  }

  const updates: Record<string, string> = {};

  // Adiciona os campos enviados ao objeto de atualização
  for (const [key, value] of formData.entries()) {
    if (key !== "id" && key !== "adminEmail" && value) {
      updates[key] = value as string;
    }
  }

  if (Object.keys(updates).length === 0 && !adminEmail) {
    return NextResponse.json(
      { error: "Nenhum campo para atualizar foi fornecido." },
      { status: 400 }
    );
  }

  try {
    // Atualiza os campos especificados no condomínio
    if (Object.keys(updates).length > 0) {
      await prisma.condominio.update({
        where: { id },
        data: updates,
      });
    }

    // Adicionar ou remover administrador
    if (adminEmail) {
      const usuario = await prisma.usuario.findUnique({
        where: { email: adminEmail },
      });

      if (!usuario) {
        return NextResponse.json(
          { error: "Usuário não encontrado pelo email fornecido." },
          { status: 404 }
        );
      }

      const adminExists = await prisma.admin.findFirst({
        where: {
          usuarioId: usuario.id,
          condominioId: id,
        },
      });

      if (adminExists) {
        // Remover administrador
        await prisma.admin.delete({
          where: { id: adminExists.id },
        });
        return NextResponse.json({
          message: "Administrador removido com sucesso!",
        });
      } else {
        // Adicionar administrador
        await prisma.admin.create({
          data: {
            usuarioId: usuario.id,
            condominioId: id,
          },
        });
        return NextResponse.json({
          message: "Administrador adicionado com sucesso!",
        });
      }
    }

    return NextResponse.json({
      message: "Informações do condomínio atualizadas com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar as informações do condomínio." },
      { status: 500 }
    );
  }
}
