import React from 'react'
import Navbar from './components/navbarOpen'
import Image from 'next/image'


export default function Page() {
  return (
    <>
      <Navbar />
      <div id='home' className='flex flex-col items-center justify-center min-h-screen m-auto p-24'>
        <div className="flex flex-col items-center md:items-end md:flex-row bg-gradient-to-r from-g0 to-g1 w-[80%] max-w-[1200px] m-auto mt-4 rounded-[12px] overflow-hidden shadow-lg">
          <div className="flex flex-col items-start justify-center w-full gap-4 p-4 lg:p-8 mx-auto relative text-t2">
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
      <div id='sobre' className='bg-[url("/home/fundo-sobre.png")] bg-cover bg-no-repeat bg-center min-h-screen'>
        <h1>Sobre</h1>

      </div>
    </>
  )
}