import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentMode: {
        type: String,
        // enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'upi', 'cash'],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    response: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Failed'],
        default: 'Pending'
    },
    packageTime: {
        type: String,
        required: true
    },
    bookingDate:{
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
