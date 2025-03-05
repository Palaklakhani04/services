import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json(); // Read request body
        const { email, password } = body;

        console.log(body.email, password, 'admin--------')

        if ('admin@easemate.com' == email) {

            if ('admin1111' == password) {
                return NextResponse.json(
                    { status: 200, message: 'admin login sucessfully' },
                );
            } else {
                return NextResponse.json(
                    { message: 'password is invalid. Please enter valid password' },
                    { status: 400 }
                );
            }

        } else {
            return NextResponse.json(
                { message: "admin not found." },
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