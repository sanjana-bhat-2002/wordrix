/*
  Warnings:

  - You are about to drop the column `count` on the `StreakData` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `StreakData` table. All the data in the column will be lost.
  - Added the required column `weight` to the `StreakData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StreakData" DROP COLUMN "count",
DROP COLUMN "level",
ADD COLUMN     "weight" INTEGER NOT NULL;
