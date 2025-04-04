

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
