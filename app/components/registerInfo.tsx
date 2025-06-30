"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


export default function RegisterInfo() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  if (image == "") {
    setImage('/Login/User.png')
  }
  React.useEffect(() => {
    const updateUser = async () => {
      await authClient.updateUser({
        image: image
      });
    };
    updateUser();
  }, [image]);

  return (
    <div className="p-6">
      <form
        action={async (formData: FormData) => {
          const response = await fetch("/api/account/registerinformation", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.error);
            return;
          }

          const result = await response.json();
          toast.success(result.message);
          router.push("/dashboard/user");
        }}
        className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5 mt-10 mx-auto sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Informações pessoais
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Essas informações poderão ser utilizadas em documentos para emissões,
          criação de condomínios e unidades
        </p>

        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:border-[#015388] hover:border-[#015388] transition"
        />

        <input
          type="text"
          name="img"
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL da Imagem (opcional, só aceitamos formatos do Imgur.)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:border-[#015388] hover:border-[#015388] transition"
        />

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:border-[#015388] hover:border-[#015388] transition"
        />

        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:border-[#015388] hover:border-[#015388] transition"
        />

        <input
          type="date"
          name="date"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-500 focus:outline-none focus:border-[#015388] hover:border-[#015388] transition"
        />

        <button
          type="submit"
          className="w-full bg-[#015388] hover:bg-[#01416b] text-white font-semibold px-4 py-3 rounded-xl transition"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
