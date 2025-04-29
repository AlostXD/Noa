"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import NavbarDashboard from "../components/navbarDashboard";


export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        
        // Verifica se o usuário está autenticado
        const session = await authClient.getSession();

        console.log("Resposta da sessão:", session);

        if (!session || !session || !session.data?.user) {
          alert("Usuário não autenticado, redirecionando para a página inicial.");
          router.push("/");
        } else {
          toast.success(`Sessão verificada com sucesso, seja bem-vindo(a) ao seu Dashboard, ${session.data.user.name}!`);
          setLoading(false); // Liberar o conteúdo
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        router.push("/");
      }
    }

    checkAuth();
  }, [router]);

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/sign-in");
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <NavbarDashboard />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Dashboard!</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
    </>
  );
}
