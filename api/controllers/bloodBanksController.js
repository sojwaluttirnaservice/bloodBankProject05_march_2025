const asyncHandler = require("../asyncHandler")
const bloodBanksModel = require("../models/bloodBanksModel")
const bloodStocksModel = require("../models/bloodStocksModel")
const { sendResponse, sendError } = require("../utils/responses/ApiResponse")
const { SUCCESS, FAILURE } = require("../utils/responses/successCodes")

const bloodBanksController = {


    add: asyncHandler(async (req, res) => {


        let bloodBankData = req.body;

        const [addResult] = await bloodBanksModel.add(bloodBankData)


        if (addResult.affectedRows > 0)
            return sendResponse(res, 201, SUCCESS, 'Blood bank details added successfully')
        else
            return sendError(res, 400, FAILURE, 'Could not add blood bank details')
    }),


    addStock: asyncHandler(async (req, res) => {
        const newStockData = req.body;


        const [addResult] = await bloodStocksModel.addToAddtionRecord(newStockData)

        if (addResult.affectedRows <= 0) {
            return sendResponse(res, 400, FAILURE, 'Unable to add the stock')
        }

        const [updateStockResult] = await bloodStocksModel.increaseStock(newStockData)

        if (updateStockResult.affectedRows > 0) {
            return sendResponse(res, 200, SUCCESS, 'Stock updated successfully')
        }
    }),


    updatePrice: asyncHandler(async (req, res) => {
        let updatedStockDetails = req.body;

        const [updateResult] = await bloodStocksModel.updatePrice(updatedStockDetails)

        if (updateResult.affectedRows > 0) {
            return sendResponse(res, 200, SUCCESS, 'Price updated successfully')
        }
    }),


    getTotalBloodBanks: asyncHandler(async (req, res) => {
        const [bloodBanks] = await bloodBanksModel.getAll()
        return sendResponse(res, 200, SUCCESS, 'Blood Banks fetched successfully', { bloodBanks })
    }),

}

module.exports = bloodBanksController