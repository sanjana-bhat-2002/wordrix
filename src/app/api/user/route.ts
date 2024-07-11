import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from 'bcrypt';
import * as z from 'zod';

const userSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid Email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have more than 8 chars') 
    })




export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, username, password } = userSchema.parse(body);
        console.log(email, username, password);

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email}
        })
        
        if(existingUserByEmail) {
            console.log("existing email")
            return NextResponse.json({user: null, message: "Email already exists"}, {status: 409});
        }
        

        const existingUserByName = await db.user.findUnique({
            where: { username: username}
        })
        if(existingUserByName) {
            console.log("existing username");
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