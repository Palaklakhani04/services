import Booking from "@/app/api/model/Booking";
import dbConnect from "@/app/lib/db";

import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await dbConnect();
        const userId = req.headers.get('user-id'); // Assuming user ID is sent in headers
        
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const services = await Booking.find({ userId, status: 'Booked' });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    await dbConnect();
    
    try {
        const { id } = params;
        if (!id) return NextResponse.json({ error: "Service ID is required" }, { status: 400 });

        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) return NextResponse.json({ error: "Service not found" }, { status: 404 });

        return NextResponse.json({ message: "Service canceled successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to cancel service" }, { status: 500 });
    }
}
