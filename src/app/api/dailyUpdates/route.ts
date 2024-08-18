import { db } from '@/lib/db';
import { CompletionStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { generate } from "random-words";



export async function GET() {
  try {
    const currentDate = new Date();

    const users = await db.user.findMany();

    for (const user of users) {
      const existingRecord = await db.streakData.findFirst({
        where: {
          userId: user.id,
          date: currentDate,
        },
      });

      if (!existingRecord) {
        await db.streakData.create({
          data: {
            date: currentDate,
            weight: 0, 
            completionStatus: CompletionStatus.PENDING,
            userId: user.id,
          },
        });
      }
    }
    console.log("Daily Status updated");

    // Generate the word of the day
    let dailyWord = generate({ minLength: 5, maxLength: 7 }).toString().toUpperCase();
    
    const allWords = await db.dailyWord.findMany()
    const existingWord = await db.dailyWord.findFirst({
        where: {
          word: dailyWord
        },
      });

      if (!existingWord) {
        await db.dailyWord.create({
          data: {
            date: currentDate,
            word: dailyWord
          },
        });
      }
    
    return NextResponse.json({ 
      message: `Status updated for all users and daily word generated, word is ${dailyWord}`,
    }, {status: 200});
  } 
  
  catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, {status: 500});
  } 
}
