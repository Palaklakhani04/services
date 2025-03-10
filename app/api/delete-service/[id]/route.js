import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import AddServices from "../../model/Addservice";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    await AddServices.findByIdAndDelete(id);
    return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
