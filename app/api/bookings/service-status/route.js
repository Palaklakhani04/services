import dbConnect from "@/app/lib/db";
 // Ensure this model is correct
import { NextResponse } from "next/server";
import Booking from "../../model/Booking";

import jwt from "jsonwebtoken";


export async function GET(req) {
    try {
        // Get Authorization header
        const authHeader = req.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No Authorization header or invalid format.");
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        // Extract token from header
        const token = authHeader.split(" ")[1];

        // Verify token and extract userId
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);
        const userId = decoded.userId;
        
        console.log("✅ Extracted User ID from Token:", userId); // Debug Log

        // Connect to database
        await dbConnect();

        // Fetch only bookings for the logged-in user
        const services = await Booking.find({ userId });

        console.log("🔍 Filtered Bookings for User:", services); // Debug Log

        return Response.json({ success: true, data: services }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching user bookings:", error);
        return Response.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
