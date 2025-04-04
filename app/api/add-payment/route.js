
import { NextResponse } from "next/server";
import Payment from "../model/PaymentMode";
import dbConnect from "@/app/lib/db";
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

// const secretKey = 'CFJWSBH4C45CSC';
export async function POST(req) {

    console.log('add payment api -------***+++++++++*********')
    if (req.method !== 'POST') {
        return NextResponse.json(
            { message: 'Only POST requests allowed', status: 405 }
        );
    }


    const { paymentmode, transactionId, response, amount, packageId, status, packageTime, bookingDate } = await req.json();


    try {
        await dbConnect();

        const results = await Payment({
            userId, paymentmode, transactionId, response, amount, packageId, status, packageTime, bookingDate
        });
        console.log(results, 'add payment and recived id')

        return NextResponse.json(results, { status: 200, message: 'Successfully', payment_id: results.payment_id, orderid: results[0].orderid });
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