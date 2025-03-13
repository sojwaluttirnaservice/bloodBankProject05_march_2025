const asyncHandler = require("../asyncHandler")
const bloodStocksModel = require("../models/bloodStocksModel")
const ordersModel = require("../models/ordersModel")
const { sendResponse } = require("../utils/responses/ApiResponse")
const { SUCCESS, FAILURE } = require("../utils/responses/successCodes")

const ordersController = {


    add: asyncHandler(async (req, res) => {
        const orderData = req.body;


        const [saveResult] = await ordersModel.add(orderData)

        if (saveResult.affectedRows > 0) {
            return sendResponse(res, 200, SUCCESS, 'Request added succesfully')
        }
    }),

    getOrders: asyncHandler(async (req, res) => {

        let [orders] = await ordersModel.getOrders()

        return sendResponse(res, 200, SUCCESS, 'Orders fetched successfully', { orders })
    }),


    getOrderDetails: asyncHandler(async (req, res) => {
        let { orderId } = req.params

        let [orders] = await ordersModel.getOrderDetails(orderId)

        return sendResponse(res, 200, SUCCESS, `Order details for order id ${orderId} fetched successfully`, { order: orders[0] })
    }),

    getOrdersByBloodBank: asyncHandler(async (req, res) => {

        let { bloodBankId } = req.params
        let [orders] = await ordersModel.getOrdersByBloodBank(bloodBankId)

        return sendResponse(res, 200, SUCCESS, 'Order of blood bank fetched successfully', { orders })
    }),


    getOrdersByUser: asyncHandler(async (req, res) => {

        let { userId } = req.params

        let [orders] = await ordersModel.getOrdersByUser(userId)

        return sendResponse(res, 200, SUCCESS, 'Order of user fetched successfully', { orders })
    }),

    updateStatus: asyncHandler(async (req, res) => {
        const { status, blood_bank_id_fk, id: orderId } = req.body;

        if (status == 'COMPLETED') {
            // DO THIS ACTION IF YOU HAVE TO CHANGE THE STATUS TO COMPLETED 

            const [requests] = await ordersModel.getById(orderId)

            let thisRequest = requests[0]

            let [bloodStockDetails] = await bloodStocksModel.getBloodStockByBloodType(thisRequest.blood_type, blood_bank_id_fk)

            let currentBloodStockQuantity = bloodStockDetails?.[0]?.stock_quantity || 0
            // console.log(thisRequest, bloodStockDetails)

            if (thisRequest.quantity > currentBloodStockQuantity) {
                return sendResponse(
                    res,
                    400,
                    FAILURE,
                    `Request denied. Only ${currentBloodStockQuantity} units of ${thisRequest.blood_type} available.`
                );
            }

            //NOW UPDATE TEH STATUS FOR NOW

            const [updateResult] = await ordersModel.updateStatus(orderId, status)

            if (updateResult.affectedRows <= 0) {
                return sendResponse(res, 400, FAILURE, 'Could not update the status')
            }


            const [updateStockResult] = await bloodStocksModel.decreaseStock({
                quantity: thisRequest.quantity,
                blood_bank_id_fk,
                blood_type: thisRequest.blood_type
            })

            if (updateStockResult.affectedRows > 0) {
                return sendResponse(res, 200, SUCCESS, 'Request Accepted')
            }
        }

        // ELSE UPDATE HTIS HERE

        const [updateResult] = await ordersModel.updateStatus(orderId, status)

        if (updateResult.affectedRows > 0) {
            return sendResponse(res, 200, SUCCESS, 'Request Rejected')
        }
    }),

}


module.exports = ordersController