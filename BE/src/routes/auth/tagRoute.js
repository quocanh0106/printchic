
const tagController = require('../../controllers/TagController').AUTH;

function tagRoute(apiRouter) {
    apiRouter.route('/tag/list').get(tagController.list);
    apiRouter.route('/tag/info').get(tagController.info);
    apiRouter.route('/tag/create').post(tagController.create);
    apiRouter.route('/tag/update').put(tagController.update);
    apiRouter.route('/tag/delete').delete(tagController.delete);
}
module.exports = tagRoute;
