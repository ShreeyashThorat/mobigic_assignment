import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    // Check token is not null
    if (!token) {
        return res.status(400).send({
            "status": false,
            "error": "Unauthorized",
            "code": 400,
            "message": "Authorization Token Missing"
        });
    }
    const parts = token.split(' ');
    const auth_token = parts[1];
    // Verify tokken
    jwt.verify(auth_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                "status": false,
                "error": "Unauthorized",
                "code": 401,
                "message": err.name === "TokenExpiredError" ? "Authorization token has been expired" : "Invalid Authorization Token"
            });
        }
        req.user = decoded;
        next();
    });
}

export const generateToken = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ ...payload }, secretKey, {
        expiresIn: process.env.JWT_EXP,
    });
    return token;
}

export const verifyPassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (err) {
        console.error("Error verifying password:", err);
        return false;
    }
};
