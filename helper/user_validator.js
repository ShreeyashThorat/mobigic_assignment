import { body } from "express-validator";
import { validationResult } from 'express-validator';
import { statusCodes, statusJson } from "./status_codes.js";

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCodes.BAD_REQUEST).json(statusJson.badRequest({ error: errors.errors[0].msg, data: errors.array() }));
    }
    next();
};

const UserValidator = () => {
    return [
        body('email').isEmail().withMessage('Invalid email format'),
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('password').custom(validatePassword).withMessage('Your password must contain at least one uppercase letter, one symbol, and one digit.'),
        body('dob').isDate().withMessage('Date of birth must be a valid date')
    ];
}

const validatePassword = (password) => {
    const passReg = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$&*~]).{9,}$/;
    return passReg.test(password);
}

const validateEmail = (email) => {
    const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailReg.test(email);
}

export { handleValidationErrors, UserValidator, validatePassword, validateEmail };