import { db } from '@/lib/db';
import { CompletionStatus } from '@prisma/client';
import { NextResponse } from 'next/server';



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
    console.log("Daily Status updated")
    return NextResponse.json({ message: 'Status updated for all users' }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, {status: 500});
  } 
}
