const authController = require("../../controllers/authController");
const getRouter = require("../../utils/getRouter");

const authRouter = getRouter();


authRouter.post('/admin', authController.adminLogin)

authRouter.post('/user', authController.userLogin)

authRouter.post('/blood-bank', authController.bloodBankLogin)

module.exports = authRouter