const asyncHandler = require("../asyncHandler");
const adminModel = require("../models/adminModel");
const bloodBanksModel = require("../models/bloodBanksModel");
const userModel = require("../models/userModel");


const { sendResponse } = require("../utils/responses/ApiResponse");
const { FAILURE, SUCCESS } = require("../utils/responses/successCodes");

const jwt = require('jsonwebtoken')

const authController = {
    /**
     * Admin Login
     */
    adminLogin: asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return sendResponse(res, 400, FAILURE, "Username and password required");
        }

        const [existingAdmin] = await adminModel.getAdminByUsername(username);

        if (!existingAdmin?.length || existingAdmin[0]?.password !== password) {
            return sendResponse(res, 401, FAILURE, "Invalid credentials");
        }

        let { password: adminPass, ...adminWithoutPassword } = existingAdmin[0]

        const token = jwt.sign(
            {
                id: adminWithoutPassword.username,
                role: adminWithoutPassword.role || 'admin',
                username: adminWithoutPassword.username
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '2h' }
        )

        return sendResponse(res, 200, SUCCESS, "Login successful", {
            admin: { ...adminWithoutPassword, token }
        });
    }),

    /**
     * User Login
     */
    userLogin: asyncHandler(async (req, res) => {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return sendResponse(res, 400, FAILURE, "Phone number and password required");
        }

        const [existingUser] = await userModel.getByPhone(phone);

        if (!existingUser?.length || existingUser[0]?.password !== password) {
            return sendResponse(res, 401, FAILURE, "Invalid credentials");
        }

        const { password: userPass, ...user } = existingUser[0]

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role || 'user',
                phone: user.phone
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '2h' }
        )
        return sendResponse(res, 200, SUCCESS, "Login successful", {
            user: { ...user, token }
        });
    }),

    /**
     * Blood Bank Login
     */
    bloodBankLogin: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, FAILURE, "Email and password required");
        }

        const [existingBloodBank] = await bloodBanksModel.getBloodBankByEmail(email);

        if (!existingBloodBank?.length || existingBloodBank[0]?.password !== password) {
            return sendResponse(res, 401, FAILURE, "Invalid credentials");
        }

        const { password: bloodBankPass, ...bloodBank } = existingBloodBank[0]

        const token = jwt.sign(
            {
                id: bloodBank.username,
                role: bloodBank.role || 'bloodBank',
                email: bloodBank.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '2h' }
        )

        return sendResponse(res, 200, SUCCESS, "Login successful", {
            bloodBank: { ...bloodBank, token }
        });
    }),
};

module.exports = authController;
