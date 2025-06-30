"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import NavbarOpen from "../components/navbarOpen";

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true); // Ativa loading

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        image,
        callbackURL: "/dashboard",
      });

      if (error) {
        alert("Erro ao cadastrar: " + error.message);
        setLoading(false);
        return;
      }

      // Sucesso: Redireciona
      toast.success("Cadastro feito com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro geral:", err);
      alert("Erro inesperado.");
      setLoading(false);
    }
  }

  return (
    <>
      <NavbarOpen />
      <main className="bg-white flex flex-col items-center justify-center w-full min-h-screen relative overflow-hidden pt-20">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute w-[50vw] h-[50vw] top-0 right-0 bg-[#f7f9ff] rounded-full transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute w-[55vw] h-[55vw] top-0 right-0 rounded-full border-[3px] border-solid border-[#f7f9ff] transform translate-x-1/3  -translate-y-1/3" />
          <div className="absolute w-[50vw] h-[50vw] top-1/4 left-0 rounded-full border-[3px] border-solid border-[#f7f9ff] transform -translate-x-1/3" />
          <div className="absolute w-[40vw] h-[40vw] top-1/4 left-0 bg-[#f7f9ff] rounded-full transform -translate-x-1/3" />
          <div className="absolute w-[30vw] h-[30vw] bottom-0 right-0 border-2 border-solid border-[#f1f4ff] transform translate-y-1/3" />
          <div className="absolute w-[20vw] h-[30vw] bottom-0 right-0 border-2 border-solid border-[#f1f4ff] rotate-[139.09deg] transform -translate-x-1/2 translate-y-1/4" />
        </div>
        <form className="bg-white bg-opacity-50 w-full max-w-[428px] p-8 relative rounded-[40px] flex flex-col items-center shadow-2xl">
          <h1 className="font-bold text-3xl text-blue-700 text-center mb-[8px]">
            Criar conta
          </h1>

          <h2 className="font-semibold italic text-lg text-black mb-[20px] text-center">
            Entre para a sua comunidade!
          </h2>

          <div className="w-full space-y-[10px] mb-[25px]">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-[58px] bg-[#f1f4ff] rounded-[10px] p-5 font-light text-black text-opacity-70 text-base w-full border-2 border-solid  border-white focus:border-blue-600 focus:outline-none"
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-[58px] bg-[#f1f4ff] rounded-[10px] p-5 font-light text-black text-opacity-70 text-base w-full border-2 border-solid  border-white focus:border-blue-600 focus:outline-none"
            />

            <input
              type="text"
              placeholder="URL Imagem"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="h-[58px] bg-[#f1f4ff] rounded-[10px] p-5 font-light text-black text-opacity-70 text-base w-full border-2 border-solid  border-white focus:border-blue-600 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-[58px] bg-[#f1f4ff] rounded-[10px] p-5 font-light text-black text-opacity-70 text-base w-full border-2 border-solid  border-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="w-full space-y-[30px]">
            <button
              type="submit"
              onClick={handleSignUp}
              className="w-full h-[54px] bg-blue-600 rounded-[10px] shadow-[0px_10px_20px_#cad6ff] font-semibold text-white text-xl hover:bg-blue-700 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Cadastrar"}
            </button>

            <div className="w-full h-auto text-sm text-[#494949] font-normal flex justify-center">
              Já é membro?{" "}
              <a
                href="/sign-in"
                className="font-semibold text-blue-800 cursor-pointer hover:shadow-sm"
              >
                Entrar
              </a>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
