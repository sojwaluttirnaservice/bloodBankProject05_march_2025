const asyncHandler = require("../../asyncHandler");
const statsController = require("../../controllers/statsController");
const { isBloodBank, isAdmin } = require("../../middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");
const { SUCCESS } = require("../../utils/responses/successCodes");

const statsRouter = getRouter();


statsRouter.get('/blood-banks/:bloodBankId', isBloodBank, statsController.bloodBanksDashboardStats)

statsRouter.get('/admin', isAdmin, statsController.getAdminDashboardStats)


module.exports = statsRouter