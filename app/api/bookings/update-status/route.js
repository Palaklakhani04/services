// import { connectToDatabase } from "@/utils/db";
// import Service from "@/models/Service"; // Assuming you have a Mongoose model
import AddServices from "../../model/Addservice";
import dbConnect from "@/app/lib/db";

export async function PATCH(req) {
    try {
        const { serviceId, status } = await req.json();

        if (!serviceId || !status) {
            return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });
        }

        await dbConnect();

        const updatedService = await AddServices.findByIdAndUpdate(
            serviceId,
            { status },
            { new: true }
        );

        if (!updatedService) {
            return new Response(JSON.stringify({ success: false, error: "Service not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: updatedService }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
