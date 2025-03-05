import mongoose from "mongoose";



const AddServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },
    myfile: {
        unique: true,
    },
    description: {
        type: String,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
    }
   
},
    {
        timestamps: true,
    });

const AddServices = mongoose.models.addServices || mongoose.model('register', AddServicesSchema);

export default AddServices
