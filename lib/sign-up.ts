import { authClient } from "@/lib/auth-client";

const email = "usuario@example.com";
const password = "senhaSegura123";
const name = "Nome do Usuário";
const image = "https://exemplo.com/imagem.png";

const { data, error } = await authClient.signUp.email(
{
    email,
    password,
    name,
    image,
    callbackURL: "/dashboard"
},
{
    onRequest: (ctx) => {
      // Exibir carregamento
    },
    onSuccess: (ctx) => {
      // Redirecionar para o dashboard ou página de login
      
    },
    onError: (ctx) => {
      // Exibir mensagem de erro
      alert(ctx.error.message);
    },
  }
)