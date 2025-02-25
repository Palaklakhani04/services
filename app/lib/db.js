import mongoose from "mongoose";


const connection = {}


async function dbConnect() {
    if (connection.isConnected) {
        console.log('DB Aleredy connected --------------------')
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        connection.isConnected = db.connections[0].readyState
        console.log('DB Connected to', db.connections[0].name)
    } catch (error) {
        console.log('Connection Error', error)
    }
}

export default dbConnect;