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
    <>
      <NavbarOpen />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded px-4 py-2"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded px-4 py-2"
          />
          
          {loading &&
            <button
            type="submit"
            className="bg-gray-800 text-white rounded py-2 transition"
            disabled
            >
              Carregando...
            </button>
          }
          {!loading &&
            <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition hover:cursor-pointer"
            >
              Entrar
            </button>
          }

          <div className="flex">
            <button
              onClick={providerLogin}
              className="flex items-center justify-center gap-2 bg-gray-800 text-white rounded py-2 w-full hover:bg-gray-700 transition cursor-pointer"
            >
              <Image
                src="/login/github.png"
                alt="Github"
                width={30}
                height={30}
              />
              Github
            </button>
          </div>

          <div className="flex">
            <button
              onClick={providerGoogleLogin}
              className="flex items-center justify-center gap-2 bg-bg text-t1 rounded py-2 w-full hover:bg-amber-100 transition cursor-pointer shadow-md shadow-black hover:shadow-none"
            >
              <Image
                src="/login/google.png"
                alt="Google"
                width={30}
                height={30}
              />
              Google
            </button>
          </div>
          

          <p className="text-center text-sm text-gray-600">
            Não tem conta? <a href="/sign-up" className="text-blue-600 hover:underline">Cadastrar</a>
          </p>
        </form>
      </main>
    </>
  );
}
