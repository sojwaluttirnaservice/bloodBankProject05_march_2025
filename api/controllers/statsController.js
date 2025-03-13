const asyncHandler = require("../asyncHandler")
const adminModel = require("../models/adminModel")
const bloodBanksModel = require("../models/bloodBanksModel")
const bloodStocksModel = require("../models/bloodStocksModel")
const ordersModel = require("../models/ordersModel")
const { sendResponse } = require("../utils/responses/ApiResponse")
const { SUCCESS } = require("../utils/responses/successCodes")

const statsController = {

    bloodBanksDashboardStats: asyncHandler(async (req, res) => {

        let { bloodBankId } = req.params

        // console.log(bloodBankId)
        const [bloodBankStats] = await bloodBanksModel.getStats();

        const [bloodStocks] = await bloodStocksModel.getStockByBloodBank(bloodBankId)

        const [requestsInfo] = await ordersModel.getOrderStatsByBloodBank(bloodBankId)

        const [revenueInfo] = await ordersModel.getRevenueByBloodBank(bloodBankId)

        return sendResponse(res, 200, SUCCESS, 'Blood Bank stats fetched successfully', {
            bloodBankStats: bloodBankStats[0],
            bloodStocks: bloodStocks,
            requestsInfo: requestsInfo[0],
            revenueInfo: revenueInfo[0]
        })

    }),


    getAdminDashboardStats: asyncHandler(async (req, res) => {

        const [adminStats] = await adminModel.getAdminDashboardStats()


        return sendResponse(res, 200, SUCCESS, 'Admin stats fetched successfully', {
            adminStats
        })

    }),
}

module.exports = statsController