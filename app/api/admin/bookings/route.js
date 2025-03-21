import { NextResponse } from "next/server";

import Booking from "../../model/Booking";
import dbConnect from "@/app/lib/db";


export async function GET() {
    try {
        await dbConnect();
        const bookings = await Booking.find({});
        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
