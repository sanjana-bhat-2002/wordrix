import { PrismaClient, CompletionStatus } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const currentDate = new Date();

    // Find all users
    const users = await prisma.user.findMany();

    // Iterate over each user and create or update their daily status
    for (const user of users) {
      const existingRecord = await prisma.streakData.findFirst({
        where: {
          userId: user.id,
          date: currentDate,
        },
      });

      if (!existingRecord) {
        await prisma.streakData.create({
          data: {
            date: currentDate,
            weight: 0, // Default weight or based on your logic
            completionStatus: CompletionStatus.PENDING,
            userId: user.id,
          },
        });
      }
    }

    return NextResponse.json({ message: 'Status updated for all users' }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, {status: 500});
  } finally {
    await prisma.$disconnect();
    //NextResponse.json({ message: 'Internal server error' }, {status: 500});
  }
}
