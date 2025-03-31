import { NextResponse } from "next/server";
// import { connectDB } from "@/utils/db";
// import User from "@/models/User";
import dbConnect from "@/app/lib/db";
import Booking from "../model/Booking";
import RegisterUser from "../model/RegisterModel";


export async function GET() {
    try {
        await dbConnect();
        const users = await RegisterUser.find(); // Fetch all users

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
