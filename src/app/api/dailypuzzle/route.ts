import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from 'bcryptjs';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function GET(req: NextRequest) {
    try {
        
        const body = await req.json();
        return NextResponse.json({message: `Success! Puzzle solved!`});

    } catch(error) {
        return NextResponse.json({message: "Server Error"}, {status: 500});

    }
}