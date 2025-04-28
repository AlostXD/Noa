import { authClient } from "@/lib/auth-client";

const email = "usuario@example.com";
const password = "senhaSegura123";
const name = "Nome do Usuário";
const image = "https://exemplo.com/imagem.png";

const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
    image,
    callbackURL: "/dashboard"
})