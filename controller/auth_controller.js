import logger from "../logger/logger.js";
import { db, dbRelease } from "../database.js";
import { statusCodes, statusJson } from "../helper/status_codes.js";
import { v4, v5 } from "uuid";
import bcrypt from 'bcrypt';
import { generateToken, verifyPassword } from "../middlewares/auth_middleware.js";
import { validateEmail, validatePassword } from "../helper/user_validator.js";
import moment from 'moment';

const CreateUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password, dob } = req.body;
        const [existingUser] = await db.query(`SELECT COUNT(*) as count FROM users WHERE email = "${email}"`);
        if (existingUser[0].count !== 0) {
            return res.status(statusCodes.CONFLICT).json(statusJson.conflict({ message: "Email I'd already has been used. Try forgot password" }));
        }
        const uid = v4();
        const userid = v5(email, uid);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await db.execute(`INSERT INTO users (userid, email, firstName, lastName, dob, password) VALUES(?, ?, ?, ?, ?, ?)`, [userid, email, firstName, lastName, dob, hash]);
        const token = generateToken({ userid, email });
        return res.status(statusCodes.CREATED).json(statusJson.created({
            message: "User registered successfully",
            data: { userid, email, firstName, lastName, dob, token }
        }));
    } catch (e) {
        logger.error(`Got an error while create user: ${e}`);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(statusJson.internalServerError({ error: e }));
    } finally {
        dbRelease();
    }
}

const SignInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validateEmail(email)) {
            return res.status(statusCodes.BAD_REQUEST).json(statusJson.badRequest({ message: "Invalid Email I'd" }));
        }
        if (!validatePassword(password)) {
            return res.status(statusCodes.BAD_REQUEST).json(statusJson.badRequest({ error: "Your password must contain at least one uppercase letter, one symbol, and one digit." }));
        }
        const [userData] = await db.query(`SELECT * from users WHERE email = '${email}'`);
        if (userData.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json(statusJson.notFound({ message: "User not found" }));
        }
        const passwordMatch = await verifyPassword(password, userData[0].password);
        if (!passwordMatch) {
            return res.status(statusCodes.BAD_REQUEST).json(statusJson.badRequest({ message: "Invalid Password" }));
        }
        const token = generateToken({ userid: userData[0].userid, email: userData[0].email });
        delete userData[0].password;
        userData[0].dob = moment(userData[0].dob).format('YYYY-MM-DD');
        return res.status(statusCodes.OK).json(statusJson.ok({message: "User logged in successfully", data: { ...userData[0], token } }));
    } catch (e) {
        logger.error(`Got an error while create user: ${e}`);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(statusJson.internalServerError({ error: e }));
    } finally {
        dbRelease();
    }
}

export {
    CreateUser,
    SignInUser
}


