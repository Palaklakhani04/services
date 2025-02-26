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