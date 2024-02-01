
const postsController = require('../../controllers/PostsController').AUTH;

function postDefaultRoute(apiRouter) {
    apiRouter.route('/posts/list').get(postsController.list);
    apiRouter.route('/posts/info').get(postsController.info);
    apiRouter.route('/posts/listPostTop').get(postsController.listTop);
    apiRouter.route('/posts/listPostBottom').get(postsController.listBot);
    apiRouter.route('/posts/listInternalPost').get(postsController.listInternal);
    apiRouter.route('/posts/statisticsDashboard').get(postsController.statisticsDashboard);
    apiRouter.route('/posts/topHR').get(postsController.topHR);
}
module.exports = postDefaultRoute;
