-- CreateTable
CREATE TABLE "Documents" (
    "id" TEXT NOT NULL,
    "body" BYTEA NOT NULL,
    "description" TEXT,
    "name" TEXT,
    "userId" TEXT NOT NULL,
    "responseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Documents_responseId_key" ON "Documents"("responseId");

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
