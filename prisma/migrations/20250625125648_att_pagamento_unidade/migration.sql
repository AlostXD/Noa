-- AlterTable
ALTER TABLE "pagamento" ADD COLUMN     "unidadeId" TEXT;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
