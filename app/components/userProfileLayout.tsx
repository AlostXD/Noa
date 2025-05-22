import Image from "next/image";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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
    })
    if (!session) return <p className="text-red-500">Usuário não autenticado.</p>;

    return (
      <div className={`flex ${style} lg:flex-row justify-center items-center gap-2 lg:gap-6 lg:m-5 text-t1 font-bold`}>
        <Image
          src={session.user.image || "/Login/User.png"}
          alt="User-Profile-Icon"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="flex flex-col items-center justify-center lg:items-start">
          <h1 className="font-bold text-3xl">{session.user.name}</h1>
          <h3 className="italic opacity-50">{session.user.email}</h3>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching session:", error);
    return <p className="text-red-500">Erro ao carregar usuário</p>;
  }
}
