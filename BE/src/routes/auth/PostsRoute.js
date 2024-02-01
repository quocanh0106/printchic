
const postsController = require('../../controllers/PostsController').AUTH;
const { isAdmin, isHR } = require('../../utils/common');

function postRoute(apiRouter) {
    apiRouter.route('/posts/create').post(isHR, postsController.create);
    apiRouter.route('/posts/list').get(postsController.list);
    apiRouter.route('/posts/listByUser').get(postsController.listByUser);
    apiRouter.route('/posts/update').put(postsController.update);
    apiRouter.route('/posts/info').get(postsController.info);
    apiRouter.route('/posts/upgradeHot').put(postsController.upgradeHot);
    apiRouter.route('/posts/upgradeUrgent').put(postsController.upgradeUrgent);
    apiRouter.route('/posts/delete').delete(postsController.delete);
    apiRouter.route('/posts/approve').put(isAdmin, postsController.approve);
    apiRouter.route('/posts/apply').put(postsController.apply);
    apiRouter.route('/posts/checkApply').get(postsController.checkApply);
    apiRouter.route('/posts/purchaseProfile').put(postsController.purchaseProfile);
    apiRouter.route('/posts/inactive').put(postsController.inactive);
    apiRouter.route('/posts/extend').put(postsController.extend);
    apiRouter.route('/posts/createInternal').post(postsController.createInternal);
    apiRouter.route('/posts/updateInternal').put(postsController.updateInternal);


}
module.exports = postRoute;
