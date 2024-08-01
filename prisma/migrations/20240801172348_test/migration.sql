/*
  Warnings:

  - Added the required column `completionStatus` to the `StreakData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompletionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "StreakData" ADD COLUMN     "completionStatus" "CompletionStatus" NOT NULL;
