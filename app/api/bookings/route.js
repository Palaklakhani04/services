// import { NextResponse } from "next/server";
// import dbConnect from "@/app/lib/db";// Ensure you have a DB connection file
// import Booking from "../model/Booking"; // Import the Booking model

// // 📌 [POST] Create a Booking
// export async function POST(req) {
//     await dbConnect();

//     try {
//         const body = await req.json(); // Parse request body
//         const { serviceid, title, serviceDate, serviceTime, price, servicePay } = body;

//         // Validate required fields
//         if (!serviceid || !title || !serviceDate || !serviceTime || !price || !servicePay) {
//             return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
//         }

//          // 📌 Check if the time slot is already booked
//          const existingBooking = await Booking.findOne({ serviceid, serviceDate, serviceTime });

//          if (existingBooking) {
//              return NextResponse.json({ error: "This time slot is already booked. Please choose another." }, { status: 400 });
//          }

//         // Create a new booking
//         const newBooking = new Booking({
//             serviceid,
//             title,
//             serviceDate,
//             serviceTime,
//             price,
//             servicePay,
//         });

//         await newBooking.save(); // Save booking in the database

//         return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: "Error creating booking" }, { status: 500 });
//     }
// }

// // 📌 [GET] Fetch All Bookings
// export async function GET() {
//     await dbConnect();

//     try {
//         const bookings = await Booking.find().sort({ createdAt: -1 }); // Get latest bookings first
//         return NextResponse.json({ success: true, bookings }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 });
//     }
// }


import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db"; // Ensure you have a DB connection file
import Booking from "../model/Booking"; // Import the Booking model

// 📌 [POST] Create a Booking
export async function POST(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const { serviceid, title, serviceDate, serviceTime, price, servicePay, checkAvailability } = body;

        // If the request is for checking bookings
        if (checkAvailability) {
            const today = new Date().toISOString().split("T")[0];

            // Find all bookings for the selected service on or after today
            const bookings = await Booking.find({ serviceid, serviceDate: { $gte: today } });
            const bookedSlots = bookings.map((booking) => booking.serviceTime);

            // Check if today's date has any bookings
            const isTodayBooked = bookings.some((booking) => booking.serviceDate === today);

            return NextResponse.json({
                message: isTodayBooked
                    ? "Some slots are booked today and beyond."
                    : "No bookings for today. Future slots are booked.",
                bookedSlots,
            });
        }

        // 📌 Validate required fields for creating a booking
        if (!serviceid || !title || !serviceDate || !serviceTime || !price || !servicePay) {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
        }

        // 📌 Check if the time slot is already booked
        const existingBooking = await Booking.findOne({ serviceid, serviceDate, serviceTime });

        if (existingBooking) {
            return NextResponse.json({ error: "This time slot is already booked. Please choose another." }, { status: 400 });
        }

        // 📌 Create a new booking
        const newBooking = new Booking({
            serviceid,
            title,
            serviceDate,
            serviceTime,
            price,
            servicePay,
        });

        await newBooking.save(); // Save booking in the database

        return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error creating booking" }, { status: 500 });
    }
}

// 📌 [GET] Fetch All Bookings
export async function GET() {
    await dbConnect();

    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }); // Get latest bookings first
        return NextResponse.json({ success: true, bookings }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 });
    }
}
