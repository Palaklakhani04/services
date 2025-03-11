import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import AddServices from "../../model/Addservice";
import fs from "fs";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid request: ID missing" }, { status: 400 });
    }

    let data = await req.json();
    console.log("Received update data:", data);

    // Convert features to an array if it's a string
    if (typeof data.features === "string") {
      try {
        data.features = JSON.parse(data.features);
      } catch (error) {
        console.error("Error parsing features:", error);
        return NextResponse.json({ message: "Invalid format for features" }, { status: 400 });
      }
    }

    // Handle file (Base64 format)
    let filePath = data.filePath; // Keep existing file path if no new file is uploaded
    if (data.file && !data.file.startsWith("/uploads/")) {
      const base64Data = data.file.split(",")[1]; // Extract Base64 content
      filePath = `/uploads/${Date.now()}.png`; // Generate a unique file path
      fs.writeFileSync(`./public${filePath}`, base64Data, "base64"); // Save file
    }

    const updatedService = await AddServices.findByIdAndUpdate(
      id,
      { ...data, filePath }, // Only update file if a new one is uploaded
      { new: true }
    );

    if (!updatedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service updated successfully", updatedService }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating service:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}





// export async function PUT(req, { params }) {
//   try {
//     await dbConnect();
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json({ message: "Invalid request: ID missing" }, { status: 400 });
//     }

//     let data = await req.json();
//     console.log("📩 Received update data:", data);

//     // Ensure features is properly formatted
//     if (typeof data.features === "string") {
//       try {
//         data.features = JSON.parse(data.features);
//         console.log("✅ Parsed Features:", data.features);
//       } catch (error) {
//         console.error("❌ Error parsing features:", error);
//         return NextResponse.json({ message: "Invalid format for features" }, { status: 400 });
//       }
//     }

//     // Log before updating
//     const oldService = await AddServices.findById(id);
//     console.log("🔍 Old Service Features:", oldService?.features);

//     const updatedService = await AddServices.findByIdAndUpdate(id, data, { new: true });

//     if (!updatedService) {
//       return NextResponse.json({ message: "Service not found" }, { status: 404 });
//     }

//     console.log("✅ Successfully updated service:", updatedService);
//     return NextResponse.json({ message: "Service updated successfully", updatedService }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error updating service:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }


