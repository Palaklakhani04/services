// import dbConnect from "@/app/lib/db";
// import { NextResponse } from "next/server";
// import { verifyToken } from "../../commanfunction/comman";
// import Booking from "../../model/Booking";
// import mongoose from "mongoose";
// import Booking from "@/models/Booking"; // Ensure the correct path to the Booking model
// import { verifyToken } from "@/utils/auth"; // Import token verification function
// import dbConnect from "@/utils/dbConnect"; // Import database connection function

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
//         console.log("Decoded User ID:", userId);
//         // Fetch only PAID bookings
       

//         const paidBookings = await Booking.find({ 
//             userId: new mongoose.Types.ObjectId(userId), 
//             servicePay: { $exists: true } 
//         });
//         console.log("Paid Bookings Found:", paidBookings);  // 🔹 Debugging Step 2: Log fetched data

//         return NextResponse.json({ paidBookings }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching payment history:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }

import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "../../commanfunction/comman";
import Booking from "../../model/Booking";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        await dbConnect();
        console.log("✅ Connected to Database");

        // 🔹 Verify Token
        const tokenData = await verifyToken(req);
        if (!tokenData.verified) {
            return NextResponse.json({ message: tokenData.message }, { status: 401 });
        }

        const userId = tokenData.user.id;
        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // 🔹 Fetch Paid Bookings
        const paidBookings = await Booking.find({
            userId: new mongoose.Types.ObjectId(userId),
            servicePay: { $exists: true },
        });

        console.log("✅ Found Bookings:", paidBookings.length);
        return NextResponse.json(paidBookings, { status: 200 });
    } catch (error) {
        console.error("❌ Error Fetching Payment History:", error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
