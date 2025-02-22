import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import RegisterUser from "../model/RegisterModel";


export async function POST(req) {

    try {
        await dbConnect();
        const { name, email, mobile, address, password } = await req.json();
        console.log(name, email, mobile, address, password,'data--------------------')
        const existingUser = await RegisterUser.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }
        const newUser = new RegisterUser({ name, email, mobile, address, password });
        await newUser.save();
        return NextResponse.json(
            { message: 'User registered successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}