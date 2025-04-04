
import Booking from "@/app/api/model/Booking";
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function PUT(req, { params }) {
    const { bookingId } = params;

    try {
        await dbConnect(); // Ensure database is connected

        // Find the booking by ID and update its status to 'Cancelled'
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: "Cancelled" },
            { new: true }
        );

        if (!updatedBooking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Service cancelled successfully", booking: updatedBooking });
    } catch (error) {
        return NextResponse.json({ message: "Error cancelling service", error: error.message }, { status: 500 });
    }
}