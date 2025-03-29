import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator"


// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const matchingUser = await UserModel.findOne({email})
        if(!matchingUser) return res.status(400).json({success : false, msg : "User not found"})
        
        const validPassword = await bcrypt.compare(password, matchingUser.password)
        if(!validPassword) return res.status(400).json({success : false, msg : "Invalid Password"})

        const token = jwt.sign({userId : matchingUser._id, name : matchingUser.name},process.env.JWT_SECRET, {expiresIn : "1d"})

        res.status(200).json({success : true, msg : "Login successful!" ,token : token})

    } catch (error) {
        console.error(error)
        res.status(400).json({success : false, msg : "Error"})
    }

}


// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        
        // Check if email already exists after validation
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        }

        // Strict email validation using regular expression
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email using validator
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, msg: "Invalid email format" });
        }

        // Strong password validation
        if (password.length < 8) {
            return res.status(400).json({ success: false, msg: "Password must be at least 8 characters" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ success: false, msg: "Please enter a strong password" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json({ success: true, msg: "User created Successfully!", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: "Error" });
    }
};



// //  logout user
// const logoutUser  = async (req, res) => {

// }

export {loginUser, registerUser}