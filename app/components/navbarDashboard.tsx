"use client"


import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import UserProfile from './userProfile'




export default function NavbarDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between p-8 lg:p-4 bg-linear-to-r from-g0 to-g1 text-white lg:absolute lg:w-full">
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
            <Link className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2" href="#">
            <Image
                src="/Login/financeiro.png"
                alt="Logo"
                width={25}
                height={25}
                className="hidden lg:block"
            />
            Financeiro
            </Link>
            <Link className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2" href="#">
                <Image
                src="/Login/forum.png"
                alt="Logo"
                width={25}
                height={25}
                className="hidden lg:block"
            />
            Fórum
            </Link>
            <Link className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2" href="#">
                <Image
                src="/Login/morador/documentos.png"
                alt="Logo"
                width={25}
                height={25}
                className="hidden lg:block"
            />
            Documentos
            </Link>
            <Link className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2 bg-g0 p-2 rounded-md" href="#">
            Retornar a Dashboard
            </Link>
            <UserProfile style='flex-row' />
        </ul>
        <div className="absolute top-5 right-5 flex lg:hidden lg:items-center lg:gap-6">
            <UserProfile style='flex-row'/>
        </div>
      </div>
      {isSidebarOpen && (
        <>
            <div
                className="fixed inset-0 bg-linear-to-b from-g0 to-g1 lg:hidden flex flex-col items-center justify-between z-50 gap-4 p-4"
            >   
            <div className="flex justify-between items-center w-full">
                <button
                  className="flex flex-col gap-1"
                  onClick={() => setIsSidebarOpen(false)}
                >
                      <span className='w-6 h-1 bg-t2 p-[1px]'></span>
                      <span className='w-6 h-1 bg-t2 p-[1px]'></span>
                      <span className='w-6 h-1 bg-t2 p-[1px]'></span>
                </button>
                <UserProfile style='flex-row' />
            </div>
            <ul className='text-t2 flex flex-col items-center justify-center gap-6 font-bold'>
            <Link className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2" href="#">
            <Image
                src="/Login/financeiro.png"
                alt="Logo"
                width={25}
                height={25}
                className="block lg:hidden"
            />
            Financeiro
            </Link>
            <Link className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2" href="#">
                <Image
                src="/Login/forum.png"
                alt="Logo"
                width={25}
                height={25}
                className="block lg:hidden"
            />
            Fórum
            </Link>
            <Link className="mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2" href="#">
                <Image
                src="/Login/morador/documentos.png"
                alt="Logo"
                width={25}
                height={25}
                className="block lg:hidden"
            />
            Documentos
            </Link>
            </ul>
            <Image
                src="/Logo-B.png"
                alt="Logo"
                width={100}
                height={100}
            />
            <Link className="mb-4 lg:mb-0 transition-all text-t2 duration-300 ease-in-out hover:text-g1 hover:scale-115 flex items-center gap-2 bg-g0 p-2 rounded-md" href="#">
            Retornar a Dashboard
            </Link>
          </div>
        </>
      )}
    </>
  )
}