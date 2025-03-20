import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "../../commanfunction/comman";
import Booking from "../../model/Booking";
// import mongoose from "mongoose";
// import Booking from "@/models/Booking"; // Ensure the correct path to the Booking model
// import { verifyToken } from "@/utils/auth"; // Import token verification function
// import dbConnect from "@/utils/dbConnect"; // Import database connection function

export async function GET(req) {
    try {
        await dbConnect(); // Ensure MongoDB connection

        // Get token from request headers
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decodedUser = verifyToken(token); // Decode token to get userId

        if (!decodedUser) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }

        const userId = decodedUser.id; // Get userId from token

        // Fetch only CANCELED bookings
        const canceledBookings = await Booking.find({ userId, status: "Canceled" });

        return NextResponse.json({ canceledBookings }, { status: 200 });
    } catch (error) {
        console.error("Error fetching canceled services:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
