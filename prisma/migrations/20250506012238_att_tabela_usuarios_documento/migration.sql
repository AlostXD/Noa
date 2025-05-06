/*
  Warnings:

  - You are about to drop the column `senha` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `date` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "senha",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT NOT NULL;
