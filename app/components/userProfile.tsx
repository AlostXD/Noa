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
          <h1>{session.user.name}</h1>
          {isDropdownOpen && (
            <div
              className="mt-2 bg-gradient-to-b from-g0 to-g1 rounded shadow-lg transition-all duration-300 ease-in-out transform opacity-0 scale-95 absolute top-7 lg:top-10"
              style={{
                opacity: isDropdownOpen ? 1 : 0,
                transform: isDropdownOpen ? "scale(1)" : "scale(0.95)",
              }}
            >
              <ul className="py-2 flex flex-col text-center">
                <Link
                  className="px-4 py-2 hover:bg-gray-100"
                  href="/dashboard/user"
                >
                  Perfil
                </Link>
                <Link
                  className="px-4 py-2 hover:bg-gray-100"
                  href="/dashboard/user/information"
                >
                  Informações
                </Link>
                <Link
                  className="px-4 py-2 hover:bg-gray-100"
                  href="/dashboard/adm"
                >
                  Painel administrativo
                </Link>
                <Link
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
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
