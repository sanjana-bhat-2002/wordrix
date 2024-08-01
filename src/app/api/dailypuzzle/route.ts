import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const streakSchema = z.object({
  date: z.string().datetime(),
  weight: z.number(),
  completionStatus: z.enum(["PENDING", "COMPLETED", "FAILED"])
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { date, weight, completionStatus } = streakSchema.parse(body);
    console.log(date, weight, completionStatus);
    const dateObject = new Date(date);
    const newStreakData = await db.streakData.create({
      data: {
        date: dateObject,
        weight,
        completionStatus,
        user: { connect: { id: parseInt(session.user.id) } }, // Assumes user ID is available in the session
      },
    });

    return NextResponse.json({
      message: `Data saved successfully`,
      data: newStreakData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const streakData = await db.streakData.findMany({
      where: {
        userId: parseInt(session.user.id),
      },
    });

    console.log(streakData);
    return NextResponse.json(streakData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
