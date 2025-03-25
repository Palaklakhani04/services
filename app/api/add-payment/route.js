
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// const jwt = require('jsonwebtoken');

// const secretKey = 'CFJWSBH4C45CSC';
export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json(
            { message: 'Only POST requests allowed', status: 405 }
        );
    }

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

    const {userid, paymentmode, tranid, response, amount, package_id, status } = await req.json();

    
    try {

        // console.log(p_mode, p_userid, p_paymentmode, p_tranid, p_response, p_amount, p_payment_id, p_package_id, p_status, '---User iddd---------')
        const [results] = await connection.query('CALL sp_payment(?,?,?,?,?,?,?,?,?,?)', [p_mode, p_userid, p_paymentmode, p_tranid, p_response, p_amount, p_payment_id, p_package_id, p_status, p_location_id]);
        console.log(results, 'add payment and recived id')
        // async function main() {
        //     const mailOptions = {
        //         from: process.env.USER,
        //         to: results[0][0]?.email,
        //         subject: results[0][0]?.mainsubject,
        //         html: results[0][0]?.maintemplate,
        //     };

        //     await transporter.sendMail(mailOptions, (error, info) => {
        //         if (error) {
        //             console.error('Error sending email:', error);
        //             return NextResponse.json(
        //                 { status: 500, message: 'payment Error sending email payment' },
        //             );
        //         } else {
        //             console.log('Email sent:' + 'payment email sent successfully', info.response);
        //             return NextResponse.json({ message: 'payment email sent successfully' }, { status: 200 });
        //         }
        //     });
        // }

        // main().catch(error =>
        //     console.log(error, 'register emailllll-eeeerrrrrrrroooorrrrr')
        // );
        // console.log(results[0][0].msgcode, 'res -----------')
        return NextResponse.json(results[0], { status: 200, message: 'Successfully', payment_id: results[0].payment_id, orderid: results[0].orderid });
    } catch (error) {
        console.log(error, 'ee--rr--rr--oo--rr-----');
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
            console.log('Connection released');
        }
    }
}