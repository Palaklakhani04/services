import mongoose from "mongoose";



const AddServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,  
    },
    filePath: {
        type: String,
        required: true,
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

const AddServices = mongoose.models.addServices || mongoose.model('addServices', AddServicesSchema);

export default AddServices
