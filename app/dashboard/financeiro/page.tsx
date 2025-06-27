import React from 'react'
import NavbarDashboard from "@/app/components/navbarDashboard"
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function Financeiro() {
  // Pega a sessão do usuário autenticado
  const session = await auth.api.getSession({
        query: {
          disableCookieCache: true,
        },
        headers: await headers(),
  })

  // Procura o condomínio no banco de dados baseado no ID do criador que é o mesmo do usuário autenticado
  const condo = await prisma.condominio.findFirst({
    where: {
      criadorId: session?.user.id
    }
  })
  

  const pagamento = await prisma.pagamento.findMany({
    where: {
      condominioId: condo?.id
    }
  })


  const user = await prisma.usuario.findUnique({
    where: {
      id: session?.user.id
    }
  })

  if (!user) {
    return <div>Usuário não encontrado</div>
  }


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarDashboard />

      <div className="flex-1 p-4 flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-4xl font-bold text-black">Minhas Faturas</h1>
          <p className="text-sm text-gray-500">
            Você pode escolher outros produtos para ver as faturas
          </p>
        </div>

        <div className="mt-6 text-lg font-semibold">
          Seus produtos
        </div>

        <div className="flex flex-col">
        </div>


        <div className="flex flex-col gap-4 lg:gap-8 font-normal">
          <div className="flex flex-col lg:flex-row gap-4">
              <div className="bg-[#015388] text-white rounded-4xl  pt-6 pb-6 px-6 lg:px-9 flex-1">
                <h2 className="font-extrabold text-xl mb-2">Aluguel</h2>
                <p className="text-sm">
                  Você paga por morar em um imóvel via Locar
                </p>
              </div>
              <div className="bg-[#015388] text-white rounded-4xl pt-6 pb-6 px-6 lg:px-9 flex-1">
                <h2 className="font-extrabold text-xl mb-2">Condomínio</h2>
                <p className="text-sm">
                O valor do seu condomínio
                </p>
              </div>
          </div>

            <div className="mt-6 text-lg font-semibold">
              Faturas
            </div>

            <div className="mt-2 flex-1 bg-white rounded-2xl p-4 border border-gray-300">
              {pagamento.map((pagamento) => (
                <div key={pagamento.id} className='flex item-center justify-between p-4 border-b border-gray-200'>
                  <div>
                    <h3 className="text-lg font-semibold">Valor: R${pagamento.valor}</h3>
                    <p className='text-sm text-gray-500'>{pagamento.status} </p>
                  </div>
                  <span className='text-sm text-gray-500 '>{new Date(pagamento.dataVencimento).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}