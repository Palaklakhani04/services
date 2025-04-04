import { HttpStatusCode } from "axios";
import { NextResponse } from 'next/server';
import Payment from "../model/PaymentMode";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_STRIPE_SECRET_KEY);

export async function POST(req) {
  try {

    const { id } = await req.json();

    if (id) {

      const status = await stripe.checkout.sessions.retrieve(id)

      console.log(status.payment_status, 'check payment status api')
      if (status.payment_status === 'paid') {
        console.log('updated payment status')

        const updatedPaymentStatus = await Payment.findOneAndUpdate(
          { transactionId: status.id },
          { status: status.payment_status },
          { new: true }
        );
        console.log(updatedPaymentStatus, 'updated payment status')
        return NextResponse.json({ status: 200, message: "Payment successfully", updatedPaymentStatus });

      }


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