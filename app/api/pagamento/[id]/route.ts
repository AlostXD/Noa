import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const pagamentoId = url.pathname.split("/pagamento/").pop(); // Extrai o ID do pagamento da URL

  if (!pagamentoId) {
    return NextResponse.json(
      { error: "ID do pagamento não fornecido." },
      { status: 400 }
    );
  }

  try {
    // Atualiza o status do pagamento para "PAGO"
    const pagamentoAtualizado = await prisma.pagamento.update({
      where: { id: pagamentoId },
      data: { status: "PAGO" },
    });

    return NextResponse.json({
      message: "Pagamento atualizado para PAGO com sucesso!",
      pagamento: pagamentoAtualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar o status do pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar o status do pagamento." },
      { status: 500 }
    );
  }
}
