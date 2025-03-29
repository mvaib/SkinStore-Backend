import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    cartData : {type : Object, default :{}}
},{minimize : false})

const UserModel = mongoose.models.users || mongoose.model("users", usersSchema)

export default UserModel