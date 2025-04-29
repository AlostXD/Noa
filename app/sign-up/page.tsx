"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LogoutButton from "../components/sign-out";
import { toast } from "react-hot-toast";

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
        callbackURL: "/dashboard"
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Criar Conta</h1>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 mb-3 w-64"
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2 mb-3 w-64"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-3 py-2 mb-3 w-64"
      />
      <input
        type="text"
        placeholder="URL da Imagem (opcional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border rounded px-3 py-2 mb-6 w-64"
      />

      <button
        onClick={handleSignUp}
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white transition ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
            Carregando...
          </>
        ) : (
          "Cadastrar"
        )}
      </button>
      <LogoutButton />
    </div>
  );
}
