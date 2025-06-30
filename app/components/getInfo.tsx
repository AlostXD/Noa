import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function GetInfo() {
  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  try {
    if (!session) {
      return <p className="text-red-500">Usuário não autenticado.</p>;
    }

    const user = await prisma.usuario.findUnique({
      where: {
        id: session.user.id,
      },
    });

    return (
      <div className="w-full max-w-2xl bg-white text-gray-800 text-base px-6 md:px-12 py-8 md:py-12 rounded-b-2xl shadow-md space-y-6">
        <h2 className="text-center text-lg md:text-xl mb-2 font-bold text-[#015388]">
          Dados do Perfil
        </h2>
        <h3 className="text-center text-sm md:text-md mb-2 font-bold text-[#015388]">Para atualizar suas informações, acesse clicando <Link href={"/dashboard/user/information"} className="text-black">aqui</Link></h3>
        {[
          { label: "Nome", value: session.user.name },
          { label: "Email", value: session.user.email },
          { label: "CPF", value: user?.cpf },
          { label: "Endereço", value: user?.endereco },
          { label: "Data de Nascimento", value: user?.date },
          { label: "Cidade", value: user?.cidade },
        ].map((field, i) => (
          <div key={i} className="flex flex-col">
            <p className="text-sm text-gray-500">{field.label}</p>
            <p className="text-base font-medium">
              {field.value || "Não informado"}
            </p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching session:", error);
    return <p className="text-red-500">Erro ao carregar informações</p>;
  }
}
