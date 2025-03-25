 import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import Booking from "@/models/Booking"; // Ensure the correct path to the Booking model
// import { verifyToken } from "@/utils/auth"; // Import token verification function
// import dbConnect from "@/utils/dbConnect"; // Import database connection function

import dbConnect from "@/app/lib/db";   
import { verifyToken } from "../../commanfunction/comman";
import Booking from "../../model/Booking";
import jwt from "jsonwebtoken";


// export async function GET(req) {
//     try {
//         await dbConnect(); // Ensure MongoDB connection

//         // Get token from request headers
//         const authHeader = req.headers.get("authorization");
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//         }

//         const token = authHeader.split(" ")[1];
//         const decodedUser = verifyToken(token); // Decode token to get userId

//         if (!decodedUser) {
//             return NextResponse.json({ message: "Invalid token" }, { status: 403 });
//         }

//         const userId = decodedUser.id; // Get userId from token

//         // Fetch user's booking history
//         const bookings = await Booking.find({ userId });

//         return NextResponse.json({ bookings }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching booking history:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }



// export async function GET(req) {
//     try {
//         // Verify Token
//         const { verified, decoded } = await verifyToken(req);
//         if (!verified) {
//             return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//         }

//         await dbConnect();

//         // Get logged-in user ID from the token
//         const userId = decoded.id;

//         // Fetch only the logged-in user's service history
//         const serviceHistory = await Booking.find({ userId }).sort({ serviceDate: -1 });

//         return new Response(JSON.stringify(serviceHistory), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: "Failed to fetch service history" }), { status: 500 });
//     }
// }



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