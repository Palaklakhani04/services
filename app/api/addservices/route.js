import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import AddServices from "../model/Addservice";



export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json(); // Read request body
        const { title, description } = body;

        const existingService = await AddServices.findOne({ title , description });


        if (!existingService) {
            return NextResponse.json(
                { message: 'Add Service successfully' },
                { status: 200 }
            );
        }
        else {
            return NextResponse.json(
                { message: 'service already exists' },
                { status: 400 }
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