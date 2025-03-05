import mongoose from "mongoose";



const AdminSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    usertype: {
        type: String,
        require: true,
    }
},
    {
        timestamps: true,
    });

const AdminUser = mongoose.models.admin_login || mongoose.model('admin_login', AdminSchema);

export default AdminUser
