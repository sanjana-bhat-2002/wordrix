-- AlterTable
ALTER TABLE "DailyWord" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DailyWord_pkey" PRIMARY KEY ("id");
