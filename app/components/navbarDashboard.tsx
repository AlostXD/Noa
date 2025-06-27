"use client"

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "./userProfile";

const navigationItems = [
    { name: "Financeiro", path: "/dashboard/financeiro" },
    { name: "Fórum", path: "/dashboard/forum" },
    { name: "Docs", path: "/dashboard/documentos" },
];

export default function NavbarDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className=" h-16 relative z-50 [background:linear-gradient(90deg,rgba(7,21,49,1)_0%,rgba(7,22,50,1)_6%,rgba(7,24,53,1)_13%,rgba(6,27,58,1)_19%,rgba(6,32,64,1)_25%,rgba(5,37,72,1)_31%,rgba(5,44,80,1)_38%,rgba(4,50,90,1)_44%,rgba(4,58,100,1)_50%,rgba(3,65,110,1)_56%,rgba(2,78,128,1)_69%,rgba(1,83,136,1)_75%,rgba(1,88,142,1)_81%,rgba(0,91,147,1)_88%)]">
            
            <div className="flex items-center justify-between h-16 px-12 2xl:px-[198px] relative">
                {/* Esquerda */}
                <div className="flex items-center flex-shrink-0">
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex">
                        <Image src="/Logo-B.png" alt="Logo" width={100} height={57} />
                    </div>
                </div>

                {/* Nav Centro */}
                <ul className="hidden mdgit:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-6">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.name} className="relative">
                                <Link
                                    href={item.path}
                                    className="cursor: pointer text-white hover:bg-sky-800 hover:text-white px-3 py-1 rounded-md text-sm font-medium font-poppins"
                                >
                                    {item.name}
                                </Link>
                                {isActive && (
                                    <hr className="absolute bottom-[-4px] left-0 w-full h-1 rounded-full bg-white transition-all duration-300" />
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Direita */}
                <div className="hidden md:flex items-center gap-2 ">
                    <Link
                        className="flex items-center gap-2 transition-all duration-300 ease-in-out bg-slate-500/50 hover:scale-115 bg-g0 p-2 rounded-md text-white"
                        href="/dashboard"
                    >
                        <Image
                            src="/Login/sair.svg"
                            alt="Ícone de voltar"
                            width={24}
                            height={24}
                        />
                        Dashboard
                    </Link>
                    <UserProfile style="flex-row" />
                </div>

                {/* Mobile */}
                <div className="md:hidden">
                    <UserProfile style="flex-row" />
                </div>
            </div>

            {/* Menu mobile */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full z-50 [background:linear-gradient(90deg,rgba(7,21,49,1)_0%,rgba(7,22,50,1)_6%,rgba(7,24,53,1)_13%,rgba(6,27,58,1)_19%,rgba(6,32,64,1)_25%,rgba(5,37,72,1)_31%,rgba(5,44,80,1)_38%,rgba(4,50,90,1)_44%,rgba(4,58,100,1)_50%,rgba(3,65,110,1)_56%,rgba(2,78,128,1)_69%,rgba(1,83,136,1)_75%,rgba(1,88,142,1)_81%,rgba(0,91,147,1)_88%)]">
                    <div className="px-4 pt-4 pb-4 space-y-2">
                        {navigationItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <div key={item.name} className="relative">
                                    <Link
                                        href={isActive ? "#" : item.path}
                                        className="text-white hover:bg-sky-900 block px-3 py-2 rounded-md text-base font-medium font-poppins"
                                        onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
