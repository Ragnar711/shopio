import mongoose from "mongoose";

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI ?? "");
        console.log(`Connected to ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error connecting: ${error.message}`);
        process.exit(1);
    }
};

export default db;
