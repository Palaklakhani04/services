import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import Inquiry from "../model/Inquiry";

export async function POST(req) {
    try {
        await dbConnect();
        const { name, email, mobile, message } = await req.json();

        if (!name || !email || !mobile || !message) {
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }

        const newInquiry = new Inquiry({ name, email, mobile, message });
        await newInquiry.save();

        return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error. Please try again later." }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await dbConnect(); // Ensure database connection
        const inquiries = await Inquiry.find(); // Fetch inquiries from DB
        return NextResponse.json(inquiries);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
    }
}
