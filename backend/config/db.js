import mongoose from 'mongoose'

const connectDB = async () => {
    const MONGO_URI = "mongodb+srv://JosephDatDevAPIs:JosephDatDevAPIs@cluster0.hcyscy3.mongodb.net/?retryWrites=true&w=majority"|| process.env.MONGO_URI
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MONGO DATABASE CONNECTED")
    } catch (error) {
        console.error(`ERROR: ${error.message}`)
        process.exit(1)
    }
}
export default connectDB