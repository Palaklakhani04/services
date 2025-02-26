import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import RegisterUser from "../model/RegisterModel";


export async function POST(req) {
    try {

        await dbConnect();
        const body = await req.json();
        const {email, newpassword} = body;

        const user = await RegisterUser.findOne({ email });

        if(!user){
            return NextResponse.json(
                {
                    status:404,
                    message:'User not found'
                }
            )
        }
        else{
            await RegisterUser.updateOne({ email },{ $set: { password: newpassword }});
            return NextResponse.json(
                {
                    status: 200,
                    message: "Password updated successfully"
                },
            );

        }
        
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Internal server error' ,
                status: 500 
            }
        );
        
    }
    
}