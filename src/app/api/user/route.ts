import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { hash } from 'bcrypt';
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, username, password } = body;

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email}
        })
        if(existingUserByEmail) {
            return NextResponse.json({user: null, message: "Email already exists"}, {status: 409});
        }
        

        const existingUserByName = await db.user.findUnique({
            where: { username: username}
        })
        if(existingUserByName) {
            return NextResponse.json({user: null, message: "Username already exists"}, {status: 409});
        }
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
             }
        })





        return NextResponse.json({user: newUser, message: "New user created"});

    } catch(error) {
        return NextResponse.json({message: "Server Error"}, {status: 500});

    }
}