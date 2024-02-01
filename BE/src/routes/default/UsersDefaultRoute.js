
const usersController = require('../../controllers/UsersController').AUTH;

function UsersDefaultRoute(apiRouter) {
    apiRouter.route('/users/list').get(usersController.list);
    apiRouter.route('/users/info').get(usersController.info);
}
module.exports = UsersDefaultRoute;
