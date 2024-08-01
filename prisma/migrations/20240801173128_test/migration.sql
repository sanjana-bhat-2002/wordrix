/*
  Warnings:

  - Added the required column `emailVerificationToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmailVerificationStatus" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountVerified" "EmailVerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
ADD COLUMN     "emailVerificationToken" TEXT NOT NULL;
