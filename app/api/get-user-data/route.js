import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import RegisterUser from "../model/RegisterModel";
import { verifyToken } from "../commanfunction/comman";

export async function POST(req) {
  const body = await req.json(); // Read request body
  const { _id } = body;

  console.log(_id, 'user ****************** data')
  try {
    await dbConnect();
    // const { verified, decoded, message } = await verifyToken(req);
    // if (!verified) {
    //   return NextResponse.json({ error: message }, { status: 401 });
    // }


    const services = await RegisterUser.findById({ _id });
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
