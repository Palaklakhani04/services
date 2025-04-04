import { HttpStatusCode } from "axios";
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {

    const { id } = await req.json();

    if (id) {

      const status = await stripe.checkout.sessions.retrieve(id)
      console.log(status, 'check payment status api')
      return NextResponse.json(
        {
          result: status,
          ok: true
        },
        { status: HttpStatusCode.Ok }
      );

    }
    return NextResponse.json(
      { message: 'Missing parameter' },
      { status: HttpStatusCode.UnprocessableEntity }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Interanal server error' },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}