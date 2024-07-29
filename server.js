import express from 'express';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
}));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_, __, ___, options) => {
        throw (
            500,
            `There are too many requests.`
        );
    },
});

app.use(limiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const router = express.Router();
router.get("/api", async (req, res) => {
    return res.status(200).json({ status: true, code: 200, message: "Success" });
});

app.use("/restapi/v1", router);

// Fixed duplicate parameter issue here
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});

export default app;
