import mongoose from "mongoose";



const RegisterUserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    mobile: {
        type: Number,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        require: true,
    }
},
    {
        timestamps: true,
    });

const RegisterUser = mongoose.models.register || mongoose.model('register', RegisterUserSchema);

export default RegisterUser
