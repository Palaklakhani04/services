// import { connectToDB } from "@/utils/database";
// import Booking from "@/app/api/model/Booking"; 
import Booking from "@/app/api/model/Booking";
import dbConnect from "@/app/lib/db";

export async function PUT(req, { params }) {
    const { id } = params;

    try {
        await dbConnect();

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status: "Completed" },
            { new: true }
        );

        if (!updatedBooking) {
            return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedBooking), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update booking" }), { status: 500 });
    }
}
