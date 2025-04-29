"use client"


import Image from 'next/image'
import React, { useState } from 'react'
import UserProfile from './userProfile'

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between p-4 bg-g1 text-white">
        <div className="flex flex-col lg:flex-row justify-center">
          <button
            className="flex flex-col gap-1 lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className='w-6 h-1 bg-t2 p-[1px]'></span>
            <span className='w-6 h-1 bg-t2 p-[1px]'></span>
            <span className='w-6 h-1 bg-t2 p-[1px]'></span>
          </button>
        </div>
        <Image
          src="/Logo-B.png"
          alt="Logo"
          width={100}
          height={100}
          className="hidden lg:block"
        />
        <ul
          className={`
            lg:flex lg:items-center lg:justify-center lg:gap-4
            ${isSidebarOpen ? 'flex flex-col items-center justify-center' : 'hidden'}
          `}
        >
          <li className="mb-4 lg:mb-0"><a href="#">Home</a></li>
          <li className="mb-4 lg:mb-0"><a href="#">Soluções</a></li>
          <li className="mb-4 lg:mb-0"><a href="#">Empreendimentos</a></li>
          <li><a href="#">Acessar o Sistemas</a></li>
          <UserProfile />
        </ul>
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-g1 lg:hidden flex flex-col items-center justify-between z-50 gap-4 p-4"
            >
            <button
              className="flex flex-col gap-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className='w-6 h-1 bg-t2 p-[1px]'></span>
              <span className='w-6 h-1 bg-t2 p-[1px]'></span>
              <span className='w-6 h-1 bg-t2 p-[1px]'></span>
            </button>
            <ul className='text-t2 flex flex-col items-center justify-center gap-6 font-bold'>
              <li className="lg:mb-0"><a href="#">Home</a></li>
              <li className="lg:mb-0"><a href="#">Soluções</a></li>
              <li className="lg:mb-0"><a href="#">Empreendimentos</a></li>
              <li><a href="#">Acessar o Sistema</a></li>
            </ul>
            <Image
              src="/Logo-B.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
        </>
      )}
    </>
  )
}