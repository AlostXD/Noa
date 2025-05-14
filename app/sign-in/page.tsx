"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import Image from "next/image";
import NavbarOpen from "../components/navbarOpen";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message || "Erro ao fazer login.");
      } else {
        toast.success("Login feito com sucesso!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login.");
    }
  }

  async function providerLogin(){
    try{
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        errorCallbackURL: "/sign-in",
      })
    } catch (error) {
      alert("Erro ao fazer login com o Github.")
      router.push("/sign-in")
    }
  }



  
  async function providerGoogleLogin(){
    try{
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/sign-in",
      })
    } catch (error) {
      alert("Erro ao fazer login com o Google.")
      router.push("/sign-in")
    }
  }


  return (
    <main className="bg-white flex flex-col items-center justify-center w-full min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute w-[50vw] h-[50vw] top-0 right-0 bg-[#f7f9ff] rounded-full transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute w-[55vw] h-[55vw] top-0 right-0 rounded-full border-[3px] border-solid border-[#f7f9ff] transform translate-x-1/3  -translate-y-1/3" />
        <div className="absolute w-[50vw] h-[50vw] top-1/4 left-0 rounded-full border-[3px] border-solid border-[#f7f9ff] transform -translate-x-1/3" />
        <div className="absolute w-[40vw] h-[40vw] top-1/4 left-0 bg-[#f7f9ff] rounded-full transform -translate-x-1/3" />
        <div className="absolute w-[30vw] h-[30vw] bottom-0 right-0 border-2 border-solid border-[#f1f4ff] transform translate-y-1/3" />
        <div className="absolute w-[20vw] h-[30vw] bottom-0 right-0 border-2 border-solid border-[#f1f4ff] rotate-[139.09deg] transform -translate-x-1/2 translate-y-1/4" />
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-50 w-full max-w-[428px] p-8 relative rounded-[40px]">

        <h1 className="font-bold text-3xl text-blue-700 mb-[80px] mt-16 text-center">
          Faça login
        </h1>

        <h2 className="font-semibold italic text-xl text-black mb-[33px] text-center">
          Bem-vindo de volta!
        </h2>

        <div className="w-full space-y-[29px] mb-[30px]">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="flex justify-end w-full mb-[20px]">
          <button
            type="button"
            className="p-0 h-auto text-blue-800 text-sm hover:underline">
            Esqueceu sua senha?
          </button>
        </div>

        <div className="w-full space-y-[30px]">
          <button
            type="submit"
            className="w-full h-[54px] bg-blue-600 rounded-[10px] shadow-[0px_10px_20px_#cad6ff] font-semibold text-white text-xl hover:bg-blue-700"
            disabled={loading}>

            {loading ? "Carregando..." : "Entrar"}
          </button>

          <div className="w-full h-auto py-2.5 text-sm text-[#494949] font-normal ">
            Não tem conta? <a href="/sign-up" className="font-semibold text-blue-800 cursor-pointer hover:shadow-sm">Cadastrar-se</a>
          </div>
        </div>


        <div className="flex flex-col items-center gap-5 mt-[70px]">
          <p className="text-black text-sm font-semibold">Continue com</p>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={providerGoogleLogin}
              className="cursor-pointer w-[60px] h-[44px] bg-[#f1f4ff] rounded-[10px] flex items-center justify-center">

              <Image
                src="/login/google.png"
                alt="Google"
                width={24}
                height={24}
              />
            </button>

            <button
              type="button"
              onClick={providerLogin}
              className="cursor-pointer w-[60px] h-[44px] bg-[#f1f4ff] rounded-[10px] flex items-center justify-center">

              <Image
                src="/login/github.png"
                alt="Github"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}