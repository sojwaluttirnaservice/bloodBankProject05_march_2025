const asyncHandler = require("../asyncHandler")
const userModel = require("../models/userModel");
const { sendResponse } = require("../utils/responses/ApiResponse");
const { SUCCESS } = require("../utils/responses/successCodes");

const usersController = {


    create: asyncHandler(async (req, res) => {
        const userData = req.body


        let [saveResult] = await userModel.add(userData)

        if (saveResult.affectedRows > 0) {
            return sendResponse(res, 201, SUCCESS, 'User Signup successfull')
        }
    }),

    getTotalUsers: asyncHandler(async (req, res) => {

        let [users] = await userModel.getTotalUsers();


        return sendResponse(res, 200, SUCCESS, 'Users fetched successfully', { users })
    }),
}

module.exports = usersController