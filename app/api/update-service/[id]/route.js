import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import AddServices from "../../model/Addservice";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; // Ensure params.id exists
    if (!id) {
      return NextResponse.json({ message: "Invalid request: ID missing" }, { status: 400 });
    }

    const data = await req.json();
    if (!("active" in data)) {
      return NextResponse.json({ message: "Invalid request: Missing 'active' field" }, { status: 400 });
    }

    const updatedService = await AddServices.findByIdAndUpdate(id, { active: data.active }, { new: true });

    if (!updatedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service updated successfully", updatedService }, { status: 200 });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
