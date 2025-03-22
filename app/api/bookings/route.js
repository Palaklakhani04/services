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


// import { NextResponse } from "next/server";
// import dbConnect from "@/app/lib/db"; // Ensure you have a DB connection file
// import Booking from "../model/Booking"; // Import the Booking model

// // 📌 [POST] Create a Booking
// export async function POST(req) {
//     await dbConnect();

//     try {
        
//         const body = await req.json();
//         const { serviceid, title, serviceDate, serviceTime, price, servicePay, checkAvailability } = body;

//         // If the request is for checking bookings
//         if (checkAvailability) {
//             const today = new Date().toISOString().split("T")[0];

//             // Find all bookings for the selected service on or after today
//             const bookings = await Booking.find({ serviceid, serviceDate: { $gte: today } });
//             const bookedSlots = bookings.map((booking) => booking.serviceTime);

//             // Check if today's date has any bookings
//             const isTodayBooked = bookings.some((booking) => booking.serviceDate === today);

//             return NextResponse.json({
//                 message: isTodayBooked
//                     ? "Some slots are booked today and beyond."
//                     : "No bookings for today. Future slots are booked.",
//                 bookedSlots,
//             });
//         }

//         // 📌 Validate required fields for creating a booking
//         if (!serviceid || !title || !serviceDate || !serviceTime || !price || !servicePay) {
//             return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
//         }

//         // 📌 Check if the time slot is already booked
//         const existingBooking = await Booking.findOne({ serviceid, serviceDate, serviceTime });

//         if (existingBooking) {
//             return NextResponse.json({ error: "This time slot is already booked. Please choose another." }, { status: 400 });
//         }

//         // 📌 Create a new booking
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

 import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import Booking from "../model/Booking";
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


       

        const newBooking = new Booking({
            userId: decoded.id,
            serviceid,
            title,
            serviceDate,
            serviceTime,
            price,
            servicePay,
        });

        await newBooking.save();
        return NextResponse.json({ message: "Booking created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// 📌 [GET] Fetch User-Specific Bookings
// export async function GET(req) {
//     await dbConnect();

//     try {
//         // ✅ Verify the user's token
//         const { verified, decoded, message } = await verifyToken(req);
//         if (!verified) {
//             return NextResponse.json({ error: message }, { status: 401 });
//         }

//         // ✅ Fetch only the bookings of the authenticated user
//         const userBookings = await Booking.find({ userId: decoded.id }).sort({ createdAt: -1 });

//         return NextResponse.json({ success: true, bookings: userBookings }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching bookings:", error);
//         return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 });
//     }
// }
export async function GET(req) {
    try {
        // Verify the user's token
        const { verified, decoded } = await verifyToken(req);

        if (!verified) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        await connectToDB(); // Connect to DB

        // Fetch bookings only for the logged-in user
        const userBookings = await Booking.find({ userId: decoded.id });

        return new Response(JSON.stringify(userBookings), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), { status: 500 });
    }
}

