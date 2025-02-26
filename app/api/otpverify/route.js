import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import RegisterUser from "../model/RegisterModel";

export async function POST(req) {
    try {
        
        await dbConnect();
        const body = await req.json(); // Read request body
        const { email, otp } = body;

        const user = await RegisterUser.findOne({ email });

        if(!user){
            return NextResponse.json(
                {
                    status:404,
                    message:'User not found'
                }
            )
        }
        console.log(user.otp, 'details-------------')
        if(Number(user?.otp) === Number(otp)){

            await RegisterUser.updateOne({ email },{ $unset: {otp:""}});
            return NextResponse.json(
                {
                    status: 200,
                    email: email,
                    message: 'OTP is correct',
                },
            );

        }else{
            return NextResponse.json(
                {
                    message: 'Invalide OTP' ,
                    status: 400 
                }
            );
        }


    } catch (error) {
        console.error('Error in user otp:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
        
    }
       
}