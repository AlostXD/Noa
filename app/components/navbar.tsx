"use client"


import Image from 'next/image'
import React, { useState } from 'react'

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center justify-between">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        </div>
        <ul
          className={`lg:flex lg:gap-4 lg:static lg:bg-transparent lg:translate-x-0 lg:shadow-none lg:p-0 
          fixed top-0 left-0 h-full w-64 text-white shadow-lg p-4 transform transition-transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <li className="mb-4 lg:mb-0"><a href="#">Home</a></li>
          <li className="mb-4 lg:mb-0"><a href="#">Soluções</a></li>
          <li className="mb-4 lg:mb-0"><a href="#">Empreendimentos</a></li>
          <li><a href="#">Acessar o Sistema</a></li>
        </ul>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <ul className='text-white'>
            <li className="mb-4 lg:mb-0"><a href="#">Home</a></li>
            <li className="mb-4 lg:mb-0"><a href="#">Soluções</a></li>
            <li className="mb-4 lg:mb-0"><a href="#">Empreendimentos</a></li>
            <li><a href="#">Acessar o Sistema</a></li>
          </ul>
        </div>
      )}
    </>
  )
}