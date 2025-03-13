const asyncHandler = require("../asyncHandler");
const bloodBanksModel = require("../models/bloodBanksModel");
const getRouter = require("../utils/getRouter");
const { sendResponse } = require("../utils/responses/ApiResponse");
const { SUCCESS } = require("../utils/responses/successCodes");
const adminRouter = require("./admin/adminRouter");
const authRouter = require("./auth/authRouter");
const bloodBanksRouter = require("./bloodBanks/bloodBanksRouter");
const orderRouter = require("./order/orderRouter");
const statsRouter = require("./stats/statsRouter");
const usersRouter = require("./user/usersRouter");


const apiRouter = getRouter();


apiRouter.use('/auth', authRouter)

apiRouter.use('/blood-banks', bloodBanksRouter)

apiRouter.use('/users', usersRouter)

apiRouter.use('/admin', adminRouter)

apiRouter.use('/orders', orderRouter)

apiRouter.use('/stats', statsRouter)

apiRouter.post('/search', asyncHandler(async (req, res) => {

    const filters = req.body;

    let [bloodBanks] = await bloodBanksModel.search(filters)
    // console.log(bloodBanks)

    return sendResponse(res, 200, SUCCESS, 'Fetced ...', { bloodBanks })
    // return sendResponse(res, 200, SUCCESS, 'Blood Banks fetched succesfully', { bloodBanks })
}))


module.exports = apiRouter