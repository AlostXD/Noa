import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
    //baseURL: "https://noa-tau.vercel.app",
    baseURL: "http://localhost:3000",
});


// Essa paradinha aqui, esse Auth-client.ts é um dos arquivos do Autenticador. Aquela BaseURL ali, é a URL aonde o autenticador vai chamar as informações
// na API dele pra autenticar o usuário
// Quando se usa no localhost, é pq tá em um ambiente de testes. Quando upa pra fazer na produção mesmo, tem que trocar pro noa-tau.vercel.app ou o link original
// tipo "https://noa.sistemagerencial.com.br"