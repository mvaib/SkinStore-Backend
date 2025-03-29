import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = async (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    const actualToken = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.body.userId = decodedToken.userId;
        req.body.userName = decodedToken.name;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message); // Log specific error message
        res.status(400).json({ success: false, msg: "Error" });
    }
}

export default auth;
