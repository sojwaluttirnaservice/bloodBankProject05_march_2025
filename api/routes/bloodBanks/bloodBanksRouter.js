const bloodBanksController = require("../../controllers/bloodBanksController");
const { isAdmin, isBloodBank } = require("../../middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");


const bloodBanksRouter = getRouter();


bloodBanksRouter.get('/', isAdmin, bloodBanksController.getTotalBloodBanks)

bloodBanksRouter.post('/stock', isBloodBank, bloodBanksController.addStock)

bloodBanksRouter.post('/price', isBloodBank, bloodBanksController.updatePrice)

bloodBanksRouter.post('/', bloodBanksController.add)


module.exports = bloodBanksRouter