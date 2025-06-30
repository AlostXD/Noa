import Image from "next/image";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import GetInfo from "./getInfo";

type props = {
  style: string;
};

export default async function UserProfileLayout({ style }: props) {
  try {
    const session = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: await headers(),
    });
    if (!session)
      return <p className="text-red-500">Usuário não autenticado.</p>;

    return (
      <div
        className={`w-full max-w-2xl bg-white pt-6 px-6 md:px-16 rounded-t-2xl flex flex-col items-center text-center gap-4 shadow-md ${style}`}
      >
        <Image
          src={session.user.image || "/Login/User.png"}
          alt="Ícone de perfil"
          width={120}
          height={120}
          className="rounded-full border-4 border-blue-500 shadow-md"
        />
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-blue-800 tracking-wide">
            {session.user.name}
          </h1>
          <p className="text-sm text-gray-500 italic">{session.user.email}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching session:", error);
    return <p className="text-red-500">Erro ao carregar usuário</p>;
  }
}
