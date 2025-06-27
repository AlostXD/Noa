import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
            Informações
          </h1>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Nome:</span> {user?.nome}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-lg">
              <span className="font-semibold">CPF:</span> {user?.cpf}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Endereço:</span> {user?.endereco}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Data de Nascimento:</span>{" "}
              {user?.date}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching session:", error);
    return <p className="text-red-500">Erro ao carregar informações</p>;
  }
}
