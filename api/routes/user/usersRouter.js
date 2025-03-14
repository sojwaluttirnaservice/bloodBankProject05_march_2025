const usersController = require("../../controllers/usersController");
const { isAdmin } = require("../../middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const usersRouter = getRouter();

usersRouter.get('/', isAdmin, usersController.getTotalUsers)

// usersRouter.get('/u/:userId')


usersRouter.post('/', usersController.create)

// usersRouter.put('/')

module.exports = usersRouter