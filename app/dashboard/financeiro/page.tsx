import React from "react";
import NavbarDashboard from "@/app/components/navbarDashboard";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Financeiro() {
  // Pega a sessão do usuário autenticado
  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  // Procura o condomínio no banco de dados baseado no ID do criador que é o mesmo do usuário autenticado
  const condo = await prisma.condominio.findFirst({
    where: {
      criadorId: session?.user.id,
    },
  });

  const pagamento = await prisma.pagamento.findMany({
    where: {
      condominioId: condo?.id,
    },
  });

  console.log(pagamento);

  return (
    <>
      <NavbarDashboard />
      <div className="bg-white flex flex-col w-full min-h-screen px-6 2xl:px-[198px] py-8">
        <div className="flex-1 p-6 flex flex-col space-y-6">
          {/* Título da página */}
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-900">Minhas Faturas</h1>
            <p className="text-sm text-gray-500">
              Você pode escolher outros produtos para ver as faturas
            </p>
          </div>

          {/* Produtos - Indicadores de pagamento */}
          <div className="text-lg font-semibold">Seus produtos</div>
          <div className="flex flex-col gap-6 lg:gap-8 font-normal">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Aluguel */}
              <div className="flex-1 bg-[#f0f4f8] border-l-4 border-[#015388] p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  {/* Círculo azul com imagem */}
                  <div className="w-10 h-10 bg-[#015388] rounded-full flex items-center justify-center">
                    <Image
                      src="/login/casa.png" // Caminho da imagem
                      alt="Ícone de Aluguel"
                      width={24} // Tamanho da imagem
                      height={24} // Tamanho da imagem
                      objectFit="contain" // A imagem vai se ajustar mantendo a proporção
                    />
                  </div>
                  <div>
                    <h2 className="fonte-poppins font-semibold text-xl text-[#015388]">
                      Aluguel
                    </h2>
                    <p className="fonte-poppins text-sm text-gray-500">
                      Pague sua taxa mensal para moradia com facilidade
                    </p>
                  </div>
                </div>
              </div>

              {/* Condomínio */}
              <div className="flex-1 bg-[#f0f4f8] border-l-4 border-[#015388] p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  {/* Círculo azul com imagem */}
                  <div className="w-10 h-10 bg-[#015388] rounded-full flex items-center justify-center">
                    <Image
                      src="/login/condo.png" // Caminho da imagem
                      alt="Condomínio"
                      width={24} // Tamanho da imagem
                      height={24} // Tamanho da imagem
                      objectFit="contain" // A imagem vai se ajustar mantendo a proporção
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold fonte-poppins text-xl text-[#015388]">
                      Condomínio
                    </h2>
                    <p className="text-sm text-gray-500 fonte-poppins">
                      Mantenha-se atualizado com o valor do seu condomínio
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Faturas */}
            <div className="mt-6 text-lg font-semibold fonte-poppins">
              Faturas
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-300 shadow-lg min-h-[400px] overflow-y-auto">
              {pagamento.map((pagamento) => (
                <div
                  key={pagamento.id}
                  className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      Valor: R${pagamento.valor}
                    </h3>
                    <p className="text-sm text-gray-500">{pagamento.status}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(pagamento.dataVencimento).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
