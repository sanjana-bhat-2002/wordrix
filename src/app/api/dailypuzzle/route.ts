import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        return NextResponse.json({message: "Success! Puzzle solved"});

    } catch(error) {
        return NextResponse.json({message: "Server Error"}, {status: 500});

    }
}