const asyncHandler = require("../../utils/asyncHandler")

const authMiddleware = {

    // middleware function to verify JWT token

    isAdmin: asyncHandler(async (req, res, next) => {

        // TODO:  IMPLEMENT THE ADMIN AUTHENTICATION

        next();
    }),

    isUser: asyncHandler(async (req, res, next) => {

        // TODO:  IMPLEMENT THE USER AUTHENTICATION
        next();
    }),


    isBloodBank: asyncHandler(async (req, res, next) => {

        // TODO:  IMPLEMENT THE BLOOD BANK AUTHENTICATION
        next();
    }),

    isAdminOrBloodBank: asyncHandler(async (req, res, next) => {

        // TODO:  IMPLEMENT THE ADMIN OR BLOOD BANK AUTHENTICATION
        next();
    }),
}


module.exports = authMiddleware