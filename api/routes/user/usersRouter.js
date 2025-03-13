const usersController = require("../../controllers/usersController");
const getRouter = require("../../utils/getRouter");

const usersRouter = getRouter();

usersRouter.get('/', usersController.getTotalUsers)

usersRouter.get('/u/:userId')


// usersRouter.post('/')

// usersRouter.put('/')

module.exports = usersRouter