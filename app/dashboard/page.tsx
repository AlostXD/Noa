"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session");
        const session = await res.json();

        if (!session || !session.user) {
          router.push("/");
        } else {
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
    router.push("/");
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Dashboard!</h1>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Sair
      </button>
    </div>
  );
}
