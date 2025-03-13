const ordersController = require("../../controllers/ordersController");
const getRouter = require("../../utils/getRouter");


const orderRouter = getRouter();


orderRouter.get('/', ordersController.getOrders)

orderRouter.get('/o/:orderId', ordersController.getOrderDetails)

orderRouter.get('/u/:userId', ordersController.getOrdersByUser)

orderRouter.get('/bb/:bloodBankId', ordersController.getOrdersByBloodBank)

orderRouter.post('/', ordersController.add)

// orderRouter.put('/')

orderRouter.put('/status', ordersController.updateStatus)

module.exports = orderRouter