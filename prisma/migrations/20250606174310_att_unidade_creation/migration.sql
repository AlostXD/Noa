/*
  Warnings:

  - You are about to drop the column `condominioId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `Condominio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manutencao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pagamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unidade` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PapelUnidade" AS ENUM ('MORADOR', 'OPERADOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_condominioId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Manutencao" DROP CONSTRAINT "Manutencao_condominioId_fkey";

-- DropForeignKey
ALTER TABLE "Pagamento" DROP CONSTRAINT "Pagamento_condominioId_fkey";

-- DropForeignKey
ALTER TABLE "Unidade" DROP CONSTRAINT "Unidade_condominioId_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_condominioId_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_unidadeId_fkey";

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "condominioId",
DROP COLUMN "tipo",
DROP COLUMN "unidadeId";

-- DropTable
DROP TABLE "Condominio";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Manutencao";

-- DropTable
DROP TABLE "Pagamento";

-- DropTable
DROP TABLE "Unidade";

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "condominioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioUnidade" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "papel" "PapelUnidade" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuarioUnidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condominio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criadorId" TEXT NOT NULL,

    CONSTRAINT "condominio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "UnidadeStatus" NOT NULL,
    "condominioId" TEXT NOT NULL,

    CONSTRAINT "unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" "PagamentoStatus" NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "condominioId" TEXT NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manutencao" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ManutencaoStatus" NOT NULL,
    "condominioId" TEXT NOT NULL,

    CONSTRAINT "manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    "condominioId" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_usuarioId_condominioId_key" ON "Admin"("usuarioId", "condominioId");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioUnidade_usuarioId_unidadeId_papel_key" ON "UsuarioUnidade"("usuarioId", "unidadeId", "papel");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "condominio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioUnidade" ADD CONSTRAINT "UsuarioUnidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioUnidade" ADD CONSTRAINT "UsuarioUnidade_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condominio" ADD CONSTRAINT "condominio_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade" ADD CONSTRAINT "unidade_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "condominio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "condominio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencao" ADD CONSTRAINT "manutencao_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "condominio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_condominioId_fkey" FOREIGN KEY ("condominioId") REFERENCES "condominio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
