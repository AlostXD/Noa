import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse o corpo da requisição
    const body = await request.json();
    const { transaction_amount, description, payment_method_id, payer } = body;

    // Validação dos campos obrigatórios
    if (
      !transaction_amount ||
      !description ||
      !payment_method_id ||
      !payer?.email
    ) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    // Chamada à API do Mercado Pago
    const mercadoPagoResponse = await fetch(
      "https://api.mercadopago.com/v1/payments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_amount,
          description,
          payment_method_id,
          payer,
        }),
      }
    );

    // Verifica se a requisição foi bem-sucedida
    if (!mercadoPagoResponse.ok) {
      const errorData = await mercadoPagoResponse.json();
      return NextResponse.json(
        { error: `Erro ao processar o pagamento. ${ errorData }`},
        { status: mercadoPagoResponse.status }
      );
    }

    // Retorna os detalhes do pagamento processado
    const paymentResult = await mercadoPagoResponse.json();
    return NextResponse.json({
      message: "Pagamento processado com sucesso!",
      payment: paymentResult,
    });
  } catch (error) {
    console.error("Erro ao processar o pagamento:", error);
    return NextResponse.json(
      { error: `Erro interno ao processar o pagamento. ${error}`, },
      { status: 500 }
    );
  }
}
