import mongoose from "mongoose";
export const dbConnections = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://mvaibhav596:T4TbUS5ihP5af0oM@cluster0.ln2l8.mongodb.net/skinSotre?retryWrites=true&w=majority&appName=Cluster0`)
        console.log(`connected to MogoDB Atlas`)
    } catch (error) {
        console.error(error)
    }
}

