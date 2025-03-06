import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import AddServices from "../../model/Addservice"; 


export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const services = await AddServices.findById(id);
    if(services){
    return NextResponse.json(
        { services }, 
        { status: 200 }
    );
    }else{
        return NextResponse.json(
            {message: 'services not found'},
            {status:404}
        );
    }

  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
