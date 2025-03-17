import mongoose from "mongoose";



const BookingSchema = new mongoose.Schema({
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addservice", // Reference to Service model
        required: true  
    },
    title: {
        type: String,
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now // Auto-set when booking is made
    },
    serviceDate: {
        type: Date,
        required: true
    },
    serviceTime: { 
        type: String,
        enum: ["Morning", "Afternoon"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    servicePay: {
        type: String,
        enum: ["Cash", "Online"],
        required: true
    },
   
},
    {
        timestamps: true,
    });

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking
