import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const formData = await request.formData();
    const nome = formData.get("name") as string;
    const endereco = formData.get("endereco") as string;

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
        return NextResponse.json({ error: "Token de autorização inválido." }, { status: 401 });
    }
    const userId = authHeader

    if (!nome || !endereco || !userId) {
        return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
    } else if (nome || endereco || userId) {
            try {
                await prisma.condominio.create({
                    data: {
                        nome: nome,
                        endereco: endereco,
                        Usuario: {
                            connect: { id: userId }, // Assuming 'id' is the primary key in the 'Usuario' table
                        }
                        
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

    
}