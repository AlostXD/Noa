import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
    const formData = await request.formData();
    const nome = formData.get("name") as string;
    const endereco = formData.get("endereco") as string;

    const existingCpf = await prisma.usuario.findUnique({
        where: { cpf: cpf },
    })
    console.log(existingCpf);

    if (!nome || !email || !cpf || !endereco || !date) {
        return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
    }
    // Verifica se o CPF já existe no banco de dados
    if (existingCpf) {
        return NextResponse.json({ error: "CPF já cadastrado. Caso seja sua primeira vez colocando suas informações, entre em contato com o suporte." }, { status: 400 });
    } else if (!existingCpf) {
            try {
                const session = await auth.api.getSession(
                {
                    query: {
                    disableCookieCache: true,
                    },
                    headers: new Headers({
                    'Content-Type': 'application/json',
                    }), // pass the headers
                }
                );
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