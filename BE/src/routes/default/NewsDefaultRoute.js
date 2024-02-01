
const NewsController = require('../../controllers/NewsController').DEFAULT;


function newsRoute(apiRouter) {
    apiRouter.route('/news/list').get(NewsController.list);
    apiRouter.route('/news/info').get(NewsController.info);
}
module.exports = newsRoute;
