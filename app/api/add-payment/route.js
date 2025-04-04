
import { NextResponse } from "next/server";
import Payment from "../model/PaymentMode";
import dbConnect from "@/app/lib/db";
import { connection } from "mongoose";
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

// const secretKey = 'CFJWSBH4C45CSC';
export async function POST(req) {

    console.log('add payment api -------***++++++s+++*********')

    if (req.method !== 'POST') {
        return NextResponse.json(
            { message: 'Only POST requests allowed', status: 405 }
        );
    }

    // 🔹 Extract Token from Headers
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.error("🔴 No Authorization header or incorrect format");
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
    console.log("🔹 Received Token:", token);

    // 🔹 Verify Token
    const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);
    console.log("✅ Decoded Token:", decoded); // Log the full decoded token

    // 🔹 Check if 'id' Exists
    if (!decoded || !decoded.id) {
        console.error("🔴 User ID missing in decoded token:", decoded);
        return new Response(JSON.stringify({ message: "User ID missing in token" }), { status: 403 });
    }

    const userId = decoded.id; // Extract userId from token
    console.log("🔹 Fetching bookings for user:", userId);

    const { paymentmode, transactionId, response, amount, packageId, status, packageTime, bookingDate } = await req.json();


    try {
        await dbConnect();

        const results = await Payment({
            userId, paymentmode, transactionId, response, amount, packageId, status, packageTime, bookingDate
        });
        console.log(results, 'add payment and recived id')

        return NextResponse.json(results, { status: 200, message: 'Successfully', payment_id: results.payment_id, orderid: results.orderid });
    } catch (error) {
        console.log(error, 'ee--rr--rr--oo--rr-----');
        return NextResponse.json({ message: error.message }, { status: 500 });
    }       
}