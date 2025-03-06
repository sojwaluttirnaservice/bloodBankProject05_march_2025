const getRouter = require("../../utils/getRouter");


const orderRouter = getRouter();


orderRouter.get('/')

orderRouter.get('/o/:orderId')

orderRouter.get('/u/:userId')

orderRouter.get('/bb/:bloodBankId')

orderRouter.post('/')

orderRouter.put('/')

module.exports = orderRouter