
const NotificationsController = require('../../controllers/NotificationsController').AUTH;


function notificationsRoute(apiRouter) {
    apiRouter.route('/notifications/create').post(NotificationsController.create);
    apiRouter.route('/notifications/list').get(NotificationsController.list);
    apiRouter.route('/notifications/read').put(NotificationsController.read);
    apiRouter.route('/notifications/readAll').put(NotificationsController.readAll);
    apiRouter.route('/notifications/total').get(NotificationsController.total);

}
module.exports = notificationsRoute;
