import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import AddServices from "../model/Addservice";

export async function GET() {
  try {
    await dbConnect();

    const services = await AddServices.find();
    console.log("Fetched Services from DB:", services);

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
