import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    packageId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    packageTime: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

const Payment = mongoose.models.payment || mongoose.model('payment', paymentSchema);

export default Payment;
