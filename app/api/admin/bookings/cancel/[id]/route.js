
import Booking from "@/app/api/model/Booking";
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const { id } = params;

    try {
        await dbConnect();

        const booking = await Booking.findById(id);
        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        booking.status = "Canceled";
        await booking.save();

        return NextResponse.json({ message: "Booking canceled successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
