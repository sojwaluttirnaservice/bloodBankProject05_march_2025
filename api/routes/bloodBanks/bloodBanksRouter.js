const bloodBanksController = require("../../controllers/bloodBanksController");
const getRouter = require("../../utils/getRouter");


const bloodBanksRouter = getRouter();


bloodBanksRouter.get('/', bloodBanksController.getTotalBloodBanks)

bloodBanksRouter.post('/stock', bloodBanksController.addStock)

bloodBanksRouter.post('/price', bloodBanksController.updatePrice)


module.exports = bloodBanksRouter