-- CreateTable
CREATE TABLE "Brewery" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "address" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "breweryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Beer" ADD FOREIGN KEY ("breweryId") REFERENCES "Brewery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
