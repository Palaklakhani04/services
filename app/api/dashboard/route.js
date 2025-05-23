import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Booking from "../model/Booking"; // Ensure this model exists
import { verifyToken } from "../commanfunction/comman";



export async function GET(req) {
    try {
        // Verify Token
        const { verified, decoded } = await verifyToken(req);
        if (!verified) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        await dbConnect();

        // Filter bookings only for the logged-in user
        const userId = decoded.id;
        const totalServices = await Booking.countDocuments({ userId });
        const completedServices = await Booking.countDocuments({ userId, status: "Completed" });
        const cancelledServices = await Booking.countDocuments({ userId, status: "Cancelled" });
        const upcomingServices = await Booking.countDocuments({
            userId,
            status: "Pending" // ✅ Fetch only pending upcoming services
        });
        

        return new Response(JSON.stringify({ totalServices, completedServices, cancelledServices, upcomingServices }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch dashboard stats" }), { status: 500 });
    }
}

