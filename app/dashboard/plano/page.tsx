import NavbarDashboard from '@/app/components/navbarDashboard'
import React from 'react'
import prisma from '@/lib/prisma'
import { getSessionServer } from '@/lib/get-session-server'

export default async function Plano() {
    const user = await getSessionServer();

    const tipos = prisma.usuario.findFirst({
        where: { id: user?.user.id}
    })
    
  return (
    <>
        <NavbarDashboard />
        <div className="flex flex-col md:flex-row justify-center items-center list-none bg-gradient-to-r from-g0 to-g1 min-h-screen border-t border-white gap-10 p-4">
            <li className="flex flex-col justify-center md:justify-between items-center text-t1 bg-bg p-4 rounded-md shadow-sm gap-4 w-full max-w-[200px] md:max-w-[300px] md:min-h-[300px]">
                <h1 className="text-3xl font-bold">Morador</h1>
                <h3>R$: </h3>
                <ul>
                    <li>Ver sua unidade</li>
                    <li>Enviar feedback</li>
                    <li>Acessar documentos</li>
                </ul>
                <button>Comprar</button>
            </li>
            <li className="flex flex-col justify-center md:justify-between items-center text-t1 bg-bg p-4 rounded-md shadow-sm gap-4 w-full max-w-[200px] md:max-w-[300px] md:min-h-[300px]">
                <h1 className="text-3xl font-bold">Síndico</h1>
                <h3>R$: </h3>
                <ul>
                    <li>Ver moradores</li>
                    <li>Ver feedbacks</li>
                    <li>Ajudar na moderação (sem controle total)</li>
                </ul>
                <button>Comprar</button>
            </li>
            <li className="flex flex-col justify-center md:justify-between items-center text-t1 bg-bg p-4 rounded-md shadow-sm gap-4 w-full max-w-[200px] md:max-w-[300px] md:min-h-[300px]">
                <h1 className="text-3xl font-bold">Administrador</h1>
                <h3>R$: </h3>
                <ul>
                    <li>Gerenciar e criar condomínio</li>
                    <li>Adicionar moradores</li>
                    <li>Promover usuários</li>
                    <li>Ver pagamentos</li>
                </ul>
                <button>Comprar</button>
            </li>
        </div>
    </>
  )
}