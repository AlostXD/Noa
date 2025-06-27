import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email"; // Ajuste o caminho se necessário

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "O campo de email é obrigatório." },
        { status: 400 }
      );
    }

    // Verifica se o usuário existe no banco de dados
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Gera um token de redefinição de senha
    const resetToken = Math.random().toString(36).substring(2, 15);

    // Salva o token no banco de dados (ou em cache)
    await prisma.usuario.update({
      where: { email },
      data: { tipo: resetToken }, // Substitua "tipo" por um campo adequado para armazenar o token
    });

    // Envia o email de redefinição de senha
    await sendEmail({
      to: email,
      subject: "Redefinição de Senha",
      text: `Clique no link para redefinir sua senha: ${process.env.APP_URL}/reset-password?token=${resetToken}`,
    });

    return NextResponse.json({
      message: "Email de redefinição de senha enviado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao enviar email de redefinição de senha:", error);
    return NextResponse.json(
      { error: "Erro ao enviar email de redefinição de senha." },
      { status: 500 }
    );
  }
}
