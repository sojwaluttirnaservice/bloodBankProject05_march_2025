const asyncHandler = require("../asyncHandler")
const userModel = require("../models/userModel");
const { sendResponse } = require("../utils/responses/ApiResponse");
const { SUCCESS } = require("../utils/responses/successCodes");

const usersController = {

    getTotalUsers: asyncHandler(async (req, res) => {

        let [users] = await userModel.getTotalUsers();


        return sendResponse(res, 200, SUCCESS, 'Users fetched successfully', { users })
    }),
}

module.exports = usersController