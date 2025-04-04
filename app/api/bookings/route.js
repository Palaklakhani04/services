

import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import Booking from "../model/Booking";
import RegisterUser from "../model/RegisterModel";
import { verifyToken } from "../commanfunction/comman";


// 📌 [POST] Create a Booking


export async function POST(req) {
    try {
        const { verified, decoded, message } = await verifyToken(req);
        if (!verified) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const body = await req.json();
        const { serviceid, title, serviceDate, serviceTime, price, servicePay } = body;
        if (!serviceid || !serviceDate || !serviceTime || !price || !servicePay) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        await dbConnect();

        // ✅ Check if the slot is already booked
        const existingBooking = await Booking.findOne({
            serviceid,
            serviceDate,
            serviceTime, // 'Morning' or 'Afternoon'
        });

        if (existingBooking) {
            return NextResponse.json({ message: "This slot is already booked. Please select another slot or date." }, { status: 400 });
        }




        const newBooking = new Booking  ({
            userId: decoded.id,
            serviceid,
            title,
            serviceDate,
            serviceTime,
            price,
            servicePay,
        });



        await newBooking.save();
        return NextResponse.json({ status: 200, data: newBooking, message: "Booking created successfully" });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req) {
    try {
        // Verify the user's token
        const { verified, decoded } = await verifyToken(req);

        if (!verified) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        await dbConnect(); // Connect to DB

        // Fetch bookings only for the logged-in user
        const userBookings = await Booking.find({ userId: decoded.id }); // Selecting only name & email

        return new Response(JSON.stringify(userBookings), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), { status: 500 });
    }
}



