import React from 'react'
import NavbarDashboard from "../../components/navbarDashboard"
import prisma from '@/lib/prisma'

export default async function Financeiro() {

  const condo = await prisma.condominio.findFirst({
    where: {
      id: "1"
    }
  })

  const data = await prisma.pagamento.findFirst({
    where: {
      condominioId: condo?.id
    }
  })

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
          {data?.id}
          {data?.status}
          {data?.valor}
          {data?.condominioId}
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
              Fatura
            </div>

            <div className="mt-2 flex-1 bg-white rounded-2xl p-4 border border-gray-300">
            </div>
        </div>
      </div>
    </div>
  )
}