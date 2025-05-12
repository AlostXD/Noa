'use client';
import React from 'react';
import Image from 'next/image';
import useGetInfo from '../getInfo'; //getInfo é de outra pasta precisa adicionar o caminho

const FinanceiroPage = () => {
  const { user, notifications } = useGetInfo();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white p-4 sm:p-6 flex justify-between items-center">
        <Image src="/Logo-B.png" alt="NØÅ Logo" width={120} height={40} />
        <nav className="flex items-center">
          <button className="mr-4 text-base sm:text-lg" aria-label="Notificações">🔔 {notifications?.length || 0}</button>
          <span className="text-sm sm:text-base">{user?.name || 'Usuário'}</span>
        </nav>
      </header>

      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl sm:max-w-5xl mx-auto py-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Minhas Faturas</h2>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">Você pode selecionar outros produtos para ver as faturas</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {[1, 2].map((idx) => (
            <div key={idx} className="flex-1 bg-blue-600 text-white rounded-xl p-4 text-center hover:bg-blue-700 transition">&nbsp;</div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow h-40 sm:h-60" />
      </section>
    </main>
  );
};

export default FinanceiroPage;