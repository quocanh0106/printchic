
const newsController = require('../../controllers/NewsController').AUTH;

function newsRoute(apiRouter) {
    // apiRouter.route('/news/list').get(newsController.list);
    apiRouter.route('/news/create').post(newsController.create);
    apiRouter.route('/news/update').put(newsController.update);
    apiRouter.route('/news/delete').delete(newsController.delete);
    apiRouter.route('/news/active').put(newsController.active);
    apiRouter.route('/news/inactive').put(newsController.inactive);
}
module.exports = newsRoute;
