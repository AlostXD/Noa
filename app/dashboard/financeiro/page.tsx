"use client"

import React from 'react'
import NavbarDashboard from "../../components/navbarDashboard"

export default function Financeiro() {
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

        <div className="space-y-2 sm:flex sm:space-y-0 sm:space-x-4 mb-6">
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Aluguel</h2>
            <p className="text-sm">Você paga por morar em um imóvel via Locar</p>
          </div>
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Condomínio</h2>
            <p className="text-sm">O valor do seu condomínio</p>
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold">
          Fatura
        </div>

        <div className="mt-2 flex-1 bg-white rounded-2xl p-4 border border-gray-300">
        </div>
      </div>
    </div>
  )
}