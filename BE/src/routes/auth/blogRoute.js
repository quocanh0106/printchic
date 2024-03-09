
const blogController = require('../../controllers/BlogController').AUTH;
const fileUploader = require('../../configs/cloudinary.config');

function blogRoute(apiRouter) {
    apiRouter.route('/blog/list').get(blogController.list);
    apiRouter.route('/blog/info').get(blogController.info);
    apiRouter.route('/blog/validate').get(blogController.validate);
    apiRouter.route('/blog/create').post(fileUploader.any('files'), blogController.create);
    apiRouter.route('/blog/update').put(fileUploader.any('files'), blogController.update);
    apiRouter.route('/blog/delete').delete(blogController.delete);
}
module.exports = blogRoute;
