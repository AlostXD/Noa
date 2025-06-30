"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState } from "react";

import { createAuthClient } from "better-auth/react";
const { useSession } = createAuthClient();

type props = {
  style: string;
};

export default function UserProfile({ style }: props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session, error } = useSession();

  if (!session && error) {
    return <p className="text-red-500">Usuário não autenticado.</p>;
  }

  if (session) {
    return (
      <>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex ${style} lg:flex-row justify-center items-center gap-2 lg:m-5 text-t2 font-bold cursor-pointer relative`}
        >
          <Image
            src={session.user.image || "/Login/User.png"}
            alt="User-Profile-Icon"
            width={35}
            height={35}
            className="rounded-full"
          />
          <h1 className="font-semibold text-lg">{session.user.name}</h1>
          {isDropdownOpen && (
            <div
              className="mt-2 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform opacity-10 scale-95 absolute top-7 lg:top-10
                bg-[#024E80] border border-sky-200/10"
              style={{
                opacity: isDropdownOpen ? 1 : 0,
                transform: isDropdownOpen ? "scale(1)" : "scale(0.95)",
              }}
            >
              <ul className="py-2 px-3 flex flex-col text-center">
                <Link
                  className="px-6 py-3 rounded-lg bg-transparent text-sm text-white font-poppins font-medium hover:bg-white/30 transition-all duration-300 ease-in-out "
                  href="/dashboard/user"
                >
                  Perfil
                </Link>
                <div className="border-t border-sky-700/30"></div> {/* Linha separadora */}
                <Link
                  className="px-6 py-2 mb-1 rounded-lg bg-transparent text-sm font-poppins font-medium text-white hover:bg-white/30 transition-all duration-300 ease-in-out "
                  href="/dashboard/user/information"
                >
                  Informações
                </Link>
                <div className="border-t border-sky-700/30"></div> {/* Linha separadora */}
                <Link
                  className="px-6 py-2 mb-1 rounded-lg bg-transparent text-sm font-poppins font-medium text-white hover:bg-white/30 transition-all duration-300 ease-in-out"
                  href="/dashboard/adm"
                >
                  Painel administrativo
                </Link>
                <Link
                  className="px-6 py-2 mb-1 rounded-lg bg-red-600 hover:bg-red-700 text-lg text-white font-poppins font-medium transition-all duration-300 ease-in-out"
                  href="/sign-out"
                >
                  Sair
                </Link>
              </ul>
            </div>
          )}
          <Image src="/Login/seta.png" alt="Seta" width={12} height={12} />
        </div>
      </>
    );
  }
}
