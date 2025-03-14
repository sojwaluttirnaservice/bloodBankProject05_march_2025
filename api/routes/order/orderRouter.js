const ordersController = require("../../controllers/ordersController");
const { isAdmin, isAuthenticated, isUser, isBloodBank, isAdminOrBloodBank, isAdminOrUser } = require("../../middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");


const orderRouter = getRouter();


orderRouter.get('/', isAdmin, ordersController.getOrders)

orderRouter.get('/o/:orderId', isAuthenticated, ordersController.getOrderDetails)

orderRouter.get('/u/:userId', isAdminOrUser, ordersController.getOrdersByUser)

orderRouter.get('/bb/:bloodBankId', isAdminOrBloodBank, ordersController.getOrdersByBloodBank)

orderRouter.post('/', isUser, ordersController.add)

// orderRouter.put('/')

orderRouter.put('/status', isBloodBank, ordersController.updateStatus)

module.exports = orderRouter