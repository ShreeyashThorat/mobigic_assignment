import express from 'express';
import { db } from './database.js';
import { CreateUser, SignInUser } from './controller/auth_controller.js';
import { UserValidator, handleValidationErrors } from './helper/user_validator.js';
import { verifyToken } from './middlewares/auth_middleware.js';
import { UploadFile, DeleteFile, GetFiles } from './controller/files_controller.js';

const userRoutes = express.Router();

userRoutes.get("/api", async (req, res) => {
    try {
        await db.getConnection();
        return res.status(200).json({ status: true, code: 200, message: "Success" });
    } catch (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({ status: false, code: 500, message: err });
    }
});

userRoutes.post("/create-user", UserValidator(), handleValidationErrors, CreateUser);
userRoutes.post("/login", SignInUser);

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
userRoutes.post('/upload', verifyToken, upload.single('file'), UploadFile);
userRoutes.delete('/delete-file', verifyToken, DeleteFile);
userRoutes.get('/my-files', verifyToken, GetFiles);

export default userRoutes;