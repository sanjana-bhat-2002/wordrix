-- CreateTable
CREATE TABLE "DailyWord" (
    "word" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyWord_word_key" ON "DailyWord"("word");
