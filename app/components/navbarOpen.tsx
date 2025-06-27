"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { name: "Home", path: "/#home" },
  { name: "Sobre", path: "/#sobre" },
  { name: "Soluções", path: "/#solucoes" },
  { name: "Acessar o Sistema", path: "/dashboard" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Navbar fixa */}
      <div className="fixed w-full h-14 md:h-20 z-50 bg-white backdrop-blur-2xl text-[#021024] flex items-center justify-between px-12 2xl:px-[198px] py-2 lg:py-4">
        {/* Esquerda: Logo e botão mobile */}
        <div className="flex items-center">
          <div className="hidden md:block">
            <Image 
              src="/Logo.png" 
              alt="Logo" 
              width={100} 
              height={50}  />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-black focus:outline-none"
              aria-label="Abrir menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-4 text-base font-semibold font-poppins">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            const isButton = item.name === "Acessar o Sistema";

            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg transition ${
                      isButton
                        ? "bg-b1 text-sm text-white px-2 py-3 rounded-lg font-bold hover:px-4 hover:py-3 hover:bg-sky-800 transition-all duration-600 "
                        : `border border-transparent hover:border-b1 hover:text-b1   px-3 py-1 rounded-md transition-all duration-600 ${isActive ? "text-b1" : ""}`
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Menu mobile fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-b from-g0 to-g1 flex flex-col items-center justify-between px-12 2xl:px-[198px] pt-6 pb-8 md:hidden">
          {/* Fechar */}
          <div className="w-full flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white"
              aria-label="Fechar menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <ul className="flex flex-col items-center gap-6 text-white font-bold">
            {navigationItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg hover:text-b1 transition ${
                      isActive ? "text-b1" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logo inferior */}
          <div className="flex justify-center">
            <Image src="/Logo-B.png" alt="Logo" width={100} height={100} />
          </div>
        </div>
      )}
    </>
  );
}
