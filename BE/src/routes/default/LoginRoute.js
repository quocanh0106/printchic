
const usersController = require('../../controllers/UsersController').DEFAULT;

function loginRoute(apiRouter) {
    // regis
    apiRouter.route('/register').post(usersController.register);
    // login
    apiRouter.route('/login').post(usersController.login);
}
module.exports = loginRoute;
