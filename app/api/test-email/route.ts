import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email"; // ajuste o caminho se necessário
import { getSessionServer } from "@/lib/get-session-server";



export async function GET() {
    
    const session = await getSessionServer();
    const email = session?.user.email;

    if (!email) {
      throw new Error("Email is undefined. Please ensure the user is logged in and has a valid email.");
    }

  try {
    await sendEmail({
      to: email, // coloque um email real seu
      subject: "Teste de verificação",
      text: "Este é um teste do sistema de envio de email do BetterAuth.",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
