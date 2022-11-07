-- CreateTable
CREATE TABLE "unregisteredSquareUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emailHash" TEXT NOT NULL,
    "squareCustomerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "unregisteredSquareUser_squareCustomerId_key" ON "unregisteredSquareUser"("squareCustomerId");
