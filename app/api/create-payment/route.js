import axios, { HttpStatusCode } from "axios";
import { NextResponse } from 'next/server';
import dbConnect from "@/app/lib/db";
import AddServices from "../model/Addservice";
import jwt from "jsonwebtoken";


// import { verifyToken } from "../commanfunction/comman";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await dbConnect();
    // 🔹 Extract Token from Headers
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("🔴 No Authorization header or incorrect format");
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
    console.log("🔹 Received Token:", token);

    // 🔹 Verify Token
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);
    console.log("✅ Decoded Token:", decoded); // Log the full decoded token

    // 🔹 Check if 'id' Exists
    if (!decoded || !decoded.id) {
      console.error("🔴 User ID missing in decoded token:", decoded);
      return new Response(JSON.stringify({ message: "User ID missing in token" }), { status: 403 });
    }

    const userId = decoded.id; // Extract userId from token
    console.log("🔹 Fetching bookings for user:", userId);

    const { service_id, success_url } = await req.json();
    console.log(service_id, success_url, 'services Detailssss------')

    if (service_id && success_url) {

      const results = await AddServices.findById(service_id);
      console.log(results, 'result payment------')
      const serviceDetails = results


      if (serviceDetails?._id) {

        const price = await stripe.prices.create({
          unit_amount: Number(serviceDetails?.price) * 100,  // cent
          currency: 'inr',
          product_data: {
            name: serviceDetails.title
          }
        });

        const session = await stripe.checkout.sessions.create({
          success_url: success_url,
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          mode: 'payment',
        });

        return NextResponse.json(
          {
            result: session,
            ok: true
          },
          { status: HttpStatusCode.Ok }
        );

      } else {
        return NextResponse.json(
          { message: 'Package Not Found' },
          { status: HttpStatusCode.BadRequest }
        );
      }
    }
    return NextResponse.json(
      { message: 'Missing parameter' },
      { status: HttpStatusCode.UnprocessableEntity }
    );
  } catch (error) {
    console.log('create payment errpr', error)
    if (error?.raw?.code === 'amount_too_small' || error?.raw?.code === 'parameter_invalid_integer') {
      return NextResponse.json(
        { message: 'Minimum amount should be equivalent USD $0.5' },
        { status: HttpStatusCode.BadRequest }
      );
    }
    if (error?.raw?.param === 'unit_amount') {
      return NextResponse.json(
        { message: 'Maximum amount should be equivalent USD $999,999.99' },
        { status: HttpStatusCode.BadRequest }
      );
    }
    if (error?.raw?.code === 'parameter_missing') {
      return NextResponse.json(
        { message: 'Invalid parameter' },
        { status: HttpStatusCode.BadRequest }
      );
    }
    return NextResponse.json(
      { message: 'Interanal server error' },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}