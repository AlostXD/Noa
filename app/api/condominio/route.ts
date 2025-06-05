import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
    const formData = await request.formData();
    const nome = formData.get("name") as string;
    const endereco = formData.get("endereco") as string;

    if (!nome || !endereco) {
        return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
    }

    try {
        // Authenticate the user
        const user = await auth.api.getSession({
            query: {
                disableCookieCache: true,
            },
            headers: request.headers
        });

        if (!user?.user || !user?.user.id) {
            return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
        }

        // Check if the Usuario exists
        const usuarioExists = await prisma.usuario.findUnique({
            where: { id: user.user.id },
        });

        if (!usuarioExists) {
            return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
        }

        // Create the Condominio
        await prisma.condominio.create({
            data: {
                nome: nome,
                endereco: endereco,
                Usuario: {
                    connect: { id: usuarioExists.id },
                }
            }
        });
        return NextResponse.json({ message: "Dados registrados com sucesso!" });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Erro ao atualizar os dados." },
            { status: 500 }
        );
    }
}