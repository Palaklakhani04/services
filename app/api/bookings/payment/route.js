import { NextResponse } from 'next/server';
import Payment from '../../model/PaymentMode';
import dbConnect from '@/app/lib/db';


// export async function GET() {
//   await dbConnect();

//   try {
//     const payments = await Payment.find({}).sort({ date: -1 });
//     return NextResponse.json(payments, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching payments:', error);
//     return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import connectMongoDB from '@/app/api/lib/mongodb';
// import Payment from '@/app/api/model/Payment';
 import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    await dbConnect();

    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Replace 'your_jwt_secret' with your actual secret key
     const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);

    const userId = decoded.id;

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching user payments:', error);
    return NextResponse.json({ message: 'Failed to fetch payments' }, { status: 500 });
  }
}
