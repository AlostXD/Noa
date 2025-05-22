
import React from 'react'
import prisma from '@/lib/prisma'
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function GetInfo() {
  
      const session = await auth.api.getSession({
        query: {
          disableCookieCache: true,
        },
        headers: await headers(),
      })

  try{
    if (!session){
      return <p className="text-red-500">Usuário não autenticado.</p>;
    }
    
    const user = await prisma.usuario.findUnique({
        where: {
            id: session.user.id
        },
    });

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-200 p-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Informações</h1>
                <div className="">
                    <p>Nome: {user?.nome}</p>
                    <p>Email: {user?.email}</p>
                    <p>CPF: {user?.cpf}</p>
                    <p>Endereço: {user?.endereco}</p>
                    <p>Data de Nascimento: {user?.date}</p>
                    <p>Tipo de plano: {user?.tipo}</p>
                </div>
            </div>
        </div>
    )
  }catch (error) {
    console.error("Error fetching session:", error);
    return <p className="text-red-500">Erro ao carregar informações</p>;
  }
}