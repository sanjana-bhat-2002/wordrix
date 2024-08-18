import { db } from '@/lib/db';
import { CompletionStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { generate } from "random-words";



export async function GET() {
  try {
    const currentDate = new Date();
    console.log(currentDate)
    const dailyWord = await db.dailyWord.findFirst({
        where: {
            date: currentDate
        }
    })

    //console.log(dailyWord)
    return NextResponse.json({ 
      word: dailyWord
    }, {status: 200});
  } 
  
  catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, {status: 500});
  } 
}
