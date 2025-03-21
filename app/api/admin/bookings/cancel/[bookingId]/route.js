
import Booking from "@/app/api/model/Booking";
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";

// export async function PUT(req, { params }) {
//     const { id } = params;

//     try {
//         await dbConnect();

//         const booking = await Booking.findById(id);
//         if (!booking) {
//             return NextResponse.json({ error: "Booking not found" }, { status: 404 });
//         }

//         booking.status = "Canceled";
//         await booking.save();

//         return NextResponse.json({ message: "Booking canceled successfully" }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

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