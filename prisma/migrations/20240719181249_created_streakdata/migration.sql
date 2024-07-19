-- CreateTable
CREATE TABLE "StreakData" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "level" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StreakData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StreakData" ADD CONSTRAINT "StreakData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
