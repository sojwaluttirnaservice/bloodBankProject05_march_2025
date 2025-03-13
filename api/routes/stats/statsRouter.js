const asyncHandler = require("../../asyncHandler");
const statsController = require("../../controllers/statsController");
const getRouter = require("../../utils/getRouter");
const { SUCCESS } = require("../../utils/responses/successCodes");

const statsRouter = getRouter();


statsRouter.get('/blood-banks/:bloodBankId', statsController.bloodBanksDashboardStats)

statsRouter.get('/admin', statsController.getAdminDashboardStats)


module.exports = statsRouter