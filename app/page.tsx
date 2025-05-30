import React from 'react'
import Navbar from './components/navbarOpen'
import Image from 'next/image'


export default function Page() {
  return (
    <>
      <Navbar />
      <div id='home' className='flex flex-col items-center justify-center min-h-screen m-auto p-24'>
        <div className="flex flex-col items-center md:items-end md:flex-row bg-gradient-to-r from-g0 to-g1 w-[80%] max-w-[1200px] m-auto mt-4 rounded-[12px] overflow-hidden shadow-lg">
          <div className="flex flex-col items-start justify-center w-full gap-4 p-4 lg:p-8 mx-auto relative text-t2 text-center md:text-left">
            <h1 className='text-lg lg:text-2xl'>O futuro da gestão condominial chegou:</h1>
            <h2 className='font-bold text-lg lg:text-3xl'>Automatize processos, organize finanças e ganhe tempo para o que é essencial</h2>
            <h3 className='italic text-lg lg:text-1xl'>Um novo jeito de cuidar do que é nosso</h3>
          </div>
          <Image
            src={"/Home/cidade.png"}
            alt="Capa"
            width={400}
            height={400}
            className='opacity-30'
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h1 className='text-3xl font-bold'>Por que escolher o Noa?</h1>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <li className='list-none flex items-center text-t1 max-w-[350px] shadow-2xl min-h-[150px] rounded-md p-4'>
              <Image
                src={"/Home/pq-1.png"}
                alt="porque1"
                width={50}
                height={50}
              />
              <div className="flex flex-col max-w-[80%]">
                <h2 className='font-bold'>Sistema 100% WEB</h2>
                <p>Acesse de qualquer dispositivo, lugar e hora</p>
              </div>
            </li>
            <li className='list-none flex items-center text-t1 max-w-[350px] shadow-2xl min-h-[150px] rounded-md p-4'>
              <Image
                src={"/Home/pq-2.png"}
                alt="porque2"
                width={50}
                height={50}
              />
              <div className="flex flex-col max-w-[80%]">
                <h2 className='font-bold'>Aumente a Ocupação</h2>
                <p>Apartamentos disponíveis são facilmente encontrados por interessados.</p>
              </div>
            </li>
            <li className='list-none flex items-center text-t1 max-w-[350px] shadow-2xl min-h-[150px] rounded-md p-4'>
              <Image
                src={"/Home/pq-3.png"}
                alt="porque3"
                width={50}
                height={50}
              />
              <div className="flex flex-col max-w-[80%]">
                <h2 className='font-bold'>Preço acessível</h2>
                <p>Contrate de acordo com a quantidade de unidades</p>
              </div>
            </li>
            <li className='list-none flex items-center text-t1 max-w-[350px] shadow-2xl min-h-[150px] rounded-md p-4'>
              <Image
                src={"/Home/pq-4.png"}
                alt="porque4"
                width={50}
                height={50}
              />
              <div className="flex flex-col max-w-[80%]">
                <h2 className='font-bold'>Funcionalidades inteligentes</h2>
                <p>Com as mais modernas tecnologias do mercado</p>
              </div>
            </li>
          </div>
        </div>
      </div>



      <div id='sobre' className='bg-[url("/Home/fundo-sobre.png")] bg-cover bg-no-repeat bg-center min-h-screen text-t2 flex flex-col items-center justify-center p-12'>
        <h1 className='text-4xl font-bold'>Sobre</h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-4">
          <div className=' max-w-[800px] m-auto'>
            <div className="flex flex-col items-center justify-center gap-4 p-4 list-none">
              <li>
                <h2 className='font-bold'>O que é o Noa</h2>
                <p>Uma solução inovadora que simplifica a gestão condominial, eliminando burocracias e criando pontes entre síndicos, moradores e interessados em fazer parte da comunidade.</p>
              </li>
              <li>
                <h2 className='font-bold'>A essência do Noa</h2>
                <p>Desenvolvido para ser a ferramenta definitiva de gestão, o NOA une controle administrativo, transparência para moradores e exposição estratégica do condomínio para interessados externos.</p>
              </li>
            </div>
            <div>
              <h2 className='font-bold text-2xl'>Quem usa o Noa?</h2>
              <ul className='flex flex-wrap items-center justify-center gap-4 p-4'>
                <li className="flex items-center justify-center max-w-[350px] shadow-2xl min-h-[150px] rounded-md p-4 gap-4 text-t2">
                  <Image
                    src={"/Home/condo-s.png"}
                    alt="quem-usa-1"
                    width={20}
                    height={20}
                  />
                  <div>
                    <h3 className='font-bold'>Condomínios</h3>
                    <p>Gestão profissional que se transforma em vantagem competitiva.</p>
                  </div>
                </li>
                <li className="flex items-center justify-center max-w-[350px] shadow-2xl min-h-[150px] rounded-md p-4 gap-4 text-t2">
                  <Image
                    src={"/Home/moradores-s.png"}
                    alt="quem-usa-1"
                    width={20}
                    height={20}
                  />
                  <div>
                    <h3 className='font-bold'>Moradores</h3>
                    <p>Participação ativa e informação sempre à mão.</p>
                  </div>
                </li>
                <li className="flex items-center justify-center max-w-[350px] shadow-2xl min-h-[150px] rounded-md p-4 gap-4 text-t2">
                  <Image
                    src={"/Home/usuarios-s.png"}
                    alt="quem-usa-3"
                    width={20}
                    height={20}
                  />
                  <div>
                    <h3 className='font-bold'>Usuários Externos</h3>
                    <p>Encontre o lar ideal em condomínios que priorizam eficiência.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
            <div>
            {[
              {
              question: "Quem fundou o Noa?",
              answer: "Criado por uma equipe de estudantes de Sistemas de Informação, o NOA nasceu como solução para o Projeto Integrador do curso. Unimos teoria e prática para entregar uma ferramenta que resolve problemas reais de condomínios.",
              },
              {
              question: "Qual o propósito do Noa?",
              answer: "Facilitar a vida de síndicos, moradores e administradores, substituindo processos manuais por uma plataforma centralizada e intuitiva.",
              },
              {
              question: "Como o Noa se diferencia?",
              answer: " Priorizamos a experiência do usuário: design limpo, funcionalidades essenciais sem excessos e suporte personalizado para cada condomínio.",
              },
              {
              question: "Posso contribuir com o projeto?",
              answer: "Sim! Envie sugestões ou feedbacks pelo e-mail contato@noa.com.br. Estamos sempre aberto às necessidades dos usuários!",
              },
              {
              question: "Quais são os próximos passos?",
              answer: "Ampliar recursos, como conexão com dispositivos de segurança e otimização de entregas, sempre priorizando a facilidade que nos caracteriza.",
              }
              ].map((faq, index) => (
              <details
              key={index}
              className="p-4 max-w-[300px] m-auto"
              >
              <summary className="cursor-pointer transition-all duration-500 ease-in-out hover:font-extrabold hover:scale-110 font-semibold">{faq.question}</summary>
              <p className="mt-2 text-sm max-w-[100%] border-b p-4">{faq.answer}</p>
              </details>
              ))}
            </div>
        </div>
      </div>


      <div className="min-h-screen flex flex-col items-center justify-center p-12" id='solucoes'>
        <h1 className='text-3xl lg:text-4xl font-bold'>Soluções para seu condomínio</h1>
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center m-auto">
              <div className="flex flex-col flex-wrap xl:flex-row items-center justify-center gap-4 p-4 lg:max-w-[800px]">
                <li className='list-none flex flex-col items-center justify-center gap-4 p-4 max-w-[350px] text-center'>
                  <Image
                    src={"/Home/solu1.png"}
                    alt="solucoes-1"
                    width={100}
                    height={100}
                  />
                  <h2 className='font-bold text-xl'>Reservas de Áreas Comuns</h2>
                  <p className='italic'>Agende salões de festas, quadras esportivas ou espaços coletivos de forma prática. Consulte disponibilidade e histórico de reservas.</p>
                </li>
                <li className='list-none flex flex-col items-center justify-center gap-4 p-4 max-w-[350px] text-center'>
                  <Image
                    src={"/Home/solu2.png"}
                    alt="solucoes-2"
                    width={100}
                    height={100}
                  />
                  <h2 className='font-bold text-xl'>Acompanhamento Financeiro</h2>
                  <p className='italic'>Acesse extratos, boletos, taxas condominiais e confirme pagamentos. Receba alertas de vencimentos.</p>
                </li>
                <li className='list-none flex flex-col items-center justify-center gap-4 p-4 max-w-[350px] text-center'>
                  <Image
                    src={"/Home/solu3.png"}
                    alt="solucoes-3"
                    width={100}
                    height={100}
                  />
                  <h2 className='font-bold text-xl'>Comunicação do Condomínio</h2>
                  <p className='italic'>Avisos oficiais, enquetes e fórum para discussões. Mantenha-se atualizado sobre decisões e eventos.</p>
                </li>
                <li className='list-none flex flex-col items-center justify-center gap-4 p-4 max-w-[350px] text-center'>
                  <Image
                    src={"/Home/solu4.png"}
                    alt="solucoes-4"
                    width={100}
                    height={100}
                  />
                  <h2 className='font-bold text-xl'>Documentos Compartilhados</h2>
                  <p className='italic'>Regulamento interno, atas de reuniões e manuais em um local centralizado. Download seguro e organizado.</p>
                </li>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-4 text-center lg:max-w-[500px] lg:text-left shadow-2xl rounded-md">
                <h1 className='text-2xl lg:text-4xl font-bold'>Sou Administrador do Condomínio</h1>
                <p>Gerencie reservas, finanças, documentos e comunicação de forma profissional. Acesso a relatórios detalhados e suporte prioritário.</p>
                <button className='px-8 py-4 rounded-md bg-g0 cursor-pointer text-t2 font-bold hover:bg-g1 transition-all duration-300 ease-in-out hover:scale-110'>Gerenciar condomínio</button>
              </div>
        </div>
      </div>
    </>
  )
}