import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const formData = await request.formData();
    const nome = formData.get("name") as string;
    const email = formData.get("email") as string;
    const cpf = formData.get("cpf") as string;
    const endereco = formData.get("endereco") as string;
    const date = formData.get("date") as string;

    try {
        // Check if the user already exists
        const existingUser = await prisma.usuario.findUnique({
            where: { cpf },
        });
        if (existingUser) {
            return NextResponse.json(
                { error: "Usuário já existe." },
                { status: 409 }
            );
        }
        await prisma.usuario.create({
            data: {
                nome,
                email,
                cpf,
                endereco,
                date,
                tipo: "MORADOR", // Replace "default" with the appropriate value for the 'tipo' field
            },
        });
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