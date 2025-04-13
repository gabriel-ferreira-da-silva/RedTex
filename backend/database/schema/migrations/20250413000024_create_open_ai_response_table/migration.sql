-- AlterTable
ALTER TABLE "Documents" ALTER COLUMN "responseId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "OpenAIResponses" (
    "id" TEXT NOT NULL,
    "body" BYTEA NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpenAIResponses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpenAIResponses" ADD CONSTRAINT "OpenAIResponses_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
