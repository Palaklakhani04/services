import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import RegisterUser from "../model/RegisterModel";
import jwt from "jsonwebtoken";


export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json(); // Read request body
        const { email, password } = body;
        const existingUser = await RegisterUser.findOne({ email });


        if (existingUser) {

            const loginStatus = await RegisterUser.findOne({ email, password });

            if (loginStatus) {
                let token;
                console.log(loginStatus, 'login status-----')
                token = await jwt.sign({ id: loginStatus._id, email: loginStatus.email, name: loginStatus.name, mobile: loginStatus.mobile }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: '1h' });
                console.log(token, 'token -----------------')
                return NextResponse.json(
                    { status: 200, token: token, message: 'User login sucessfully' },
                );
            } else {
                return NextResponse.json(
                    { message: 'password is invalid. Please enter valid password' },
                    { status: 400 }
                );
            }

        } else {
            return NextResponse.json(
                { message: "User not found. Please register first." },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error('Error login user:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }


}