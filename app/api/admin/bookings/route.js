import { NextResponse } from "next/server";

import Booking from "../../model/Booking";
import dbConnect from "@/app/lib/db";


export async function GET() {
    try {
        await dbConnect();
        const bookings = await Booking.aggregate([
            {
              $lookup: {
                from: "registers",
                localField: "userId",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      _id: 0,
                      name: 1,
                      email: 1,
                      mobile: 1
                    }
                  }
                ],
                as: "userDetails"
              }
            },
            {
              $unwind: {
                path: "$userDetails",
                preserveNullAndEmptyArrays: true
              }
            }
          ]);
        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
