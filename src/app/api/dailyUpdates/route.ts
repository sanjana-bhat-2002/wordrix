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
    let dailyWord;
    const generateWord = async () => {
      dailyWord = generate({ minLength: 5, maxLength: 6 }).toString().toUpperCase();
    
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
  
        else {
            generateWord()
        }
    }
    
    await generateWord();
    
    const response = NextResponse.json({ 
      message: `Status updated for all users and daily word generated, word is ${dailyWord}`,
    }, { status: 200 });

    // Add cache-control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Expires', '0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } 
  
  catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } 
}
