import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyCpf } from "@/lib/verify-cpf";
import { get } from "http";
import { getSessionServer } from "@/lib/get-session-server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const nome = formData.get("name") as string;
    const email = formData.get("email") as string;
    const cpf = formData.get("cpf") as string;
    const endereco = formData.get("endereco") as string;
    const date = formData.get("date") as string;


    try {
        const existingCpf = await verifyCpf(); // Verifica se o CPF já existe no banco de dados
        // Check if the user already exists
        if (!existingCpf) {
            
            const session = await getSessionServer();
            if (!session || !session.user || !session.user.id) {
                throw new Error("User session is invalid or missing.");
            }
            const userId = session.user.id;

            await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    cpf,
                    endereco,
                    date,
                    tipo: "MORADOR", // Replace "default" with the appropriate value for the 'tipo' field
                    user: {
                        connect: { id: userId },
                    },
                },
            });
        } if (existingCpf) {
            await prisma.usuario.update({
                where: { cpf: existingCpf },
                data: {
                    nome,
                    email,
                    endereco,
                    date,
                },
            });
        }
        console.log("Funcionou");
        return NextResponse.json({ message: "Dados registrados com sucesso!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao atualizar os dados." },
            { status: 500 }
        );
    }
}