
const jwt = require('jsonwebtoken');
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    auth: {
        user: "palaklakhani2021@gmail.com",
        pass: "bnhz bjrz worf pyzp",
    }
});


export async function verifyToken(req) {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
        return { verified: false, message: 'Authorization header missing' };
    }

    const token = authHeader.split(" ")[1];
    console.log(token, 'token----x-xxx-x-x-x-x-x-x-x-x-x-')
    if (!token) {
        return { verified: false, message: 'Token missing' };
    }

    try {
        const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);
        console.log(decoded, 'token---decooded----x-x-x-x-x-x-x-x-x-');
        return { verified: true, decoded };
    } catch (error) {
        console.log(error, 'errorororo----')
        return { verified: false, message: 'Invalid or expired token', code: '401' };
    }
}




