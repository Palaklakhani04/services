import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import RegisterUser from "../model/RegisterModel";
import { transporter } from "../commanfunction/comman";


export async function POST(req) {

    try {
        await dbConnect();
        const body = await req.json(); // Read request body
        const { email } = body;

        const existingUser = await RegisterUser.findOne({ email });


        if (!existingUser) {
            return NextResponse.json(
                { message: 'User is not registered' },
                { status: 400 }
            );
        }
        else {

            const otp = Math.floor(100000 + Math.random() * 900000);

            await RegisterUser.updateOne({ email }, { $set: { otp } });


            const mailOptions = {
                from: process.env.USER,
                to: email,
                subject: 'Forgot Password',
                html: `<p>Your OTP is: <b>${otp}</b></p>`,
            };


            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);

            return NextResponse.json(
                {
                    status: 200,
                    email: email,
                    message: 'OTP sent successfully',
                },
            );


        }
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}