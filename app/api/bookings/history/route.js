 import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";   
import { verifyToken } from "../../commanfunction/comman";
import Booking from "../../model/Booking";
import jwt from "jsonwebtoken";



export async function GET(req) {
    try {
        await dbConnect();

        // 🔹 Extract Token from Headers
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("🔴 No Authorization header or incorrect format");
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
        console.log("🔹 Received Token:", token);

        // 🔹 Verify Token
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);
        console.log("✅ Decoded Token:", decoded); // Log the full decoded token

        // 🔹 Check if 'id' Exists
        if (!decoded || !decoded.id) {
            console.error("🔴 User ID missing in decoded token:", decoded);
            return new Response(JSON.stringify({ message: "User ID missing in token" }), { status: 403 });
        }

        const userId = decoded.id; // Extract userId from token
        console.log("🔹 Fetching bookings for user:", userId);

        // 🔹 Fetch Only Bookings for This User
        const userBookings = await Booking.find({ userId });
        console.log("🔹 Retrieved Bookings:", userBookings.length);

        return new Response(JSON.stringify({ bookings: userBookings }), { status: 200 });
    } catch (error) {
        console.error("🔴 API Error:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
    }
}