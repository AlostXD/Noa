"use client"


import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'




export default function NavbarOpen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between p-8 lg:p-4 bg-linear-to-r from-g0 to-g1 text-white fixed w-full z-50">
        <div className="flex flex-col lg:flex-row justify-center absolute top-5 left-5 lg:hidden">
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
        <ul className={` lg:flex lg:items-center lg:justify-center lg:gap-6 ${isSidebarOpen ? 'flex flex-col items-center justify-center' : 'hidden'} font-bold`}>
          <a className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-b1 hover:scale-115" href="#">Home</a>
          <a className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-b1 hover:scale-115" href="#">Soluções</a>
          <a className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-b1 hover:scale-115" href="#">Empreendimentos</a>
          <a className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 bg-g0 p-2 rounded-md" href="/dashboard">Acessar o Sistema</a>
        </ul>
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-linear-to-b from-g0 to-g1 lg:hidden flex flex-col items-center justify-between z-50 gap-4 p-4"
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
              <li className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-b1 hover:scale-115"><Link href="#">Home</Link></li>
              <li className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-b1 hover:scale-115"><Link href="#">Soluções</Link></li>
              <li className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-b1 hover:scale-115"><Link href="#">Empreendimentos</Link></li>
              <li className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115"><Link href="/dashboard">Acessar o Sistema</Link></li>
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