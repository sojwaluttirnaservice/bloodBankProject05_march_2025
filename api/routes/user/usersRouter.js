const getRouter = require("../../utils/getRouter");

const usersRouter = getRouter();

usersRouter.get('/u/:userId')

usersRouter.get('/')

usersRouter.post('/')

usersRouter.put('/')

module.exports = usersRouter