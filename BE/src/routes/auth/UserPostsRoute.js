
const UserPostsController = require('../../controllers/UserPostsController').AUTH;

function chargingHistoriesRoute(apiRouter) {
    apiRouter.route('/user-posts/list').get(UserPostsController.list);
    apiRouter.route('/user-posts/listCandidateByUser').get(UserPostsController.listCandidateByUser);
}
module.exports = chargingHistoriesRoute;
